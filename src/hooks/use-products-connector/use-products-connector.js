import {
  useMcMutation,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

import FetchProducts from './fetch-products.ctp.graphql';
import GetProductDetails from './fetch-product-details.ctp.graphql';
import UpdateProduct from './update-product.ctp.graphql';
import { createSyncProducts } from '@commercetools/sync-actions';
import { convertToActionData, createGraphQlUpdateActions } from '../../helpers';

/**
 * To Fetch all Products
 *
 * @returns
 */
export const useProductsFetcher = ({ page, perPage, tableSorting }) => {
  const { data, loading, error, refetch } = useMcQuery(FetchProducts, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  return { data: data?.products, loading, error, refetch };
};

/**
 * To Fetch details of individual product by id
 *
 * @param {{id:String}}
 */
export const useProductDetailsFetcher = ({ id }) => {
  const { data, error, loading } = useMcQuery(GetProductDetails, {
    variables: {
      id,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  return { product: data?.product, loading, error };
};

/**
 * Hook to perform Action on products
 */
export const useUpdateAction = () => {
  const [updateProductStatus] = useMcMutation(UpdateProduct);

  /**
   * To update status on array of product
   *
   * @param {{action:('publish'|'unpublish'), products:[{id:String, version:Int16Array, isPublished:boolean}]}}
   */
  const updateProductAction = async ({ action, products }) => {
    console.log(
      '🚀 ~ file: use-products-connector.js:61 ~ updateProductAction ~ action:',
      action
    );
    console.log(
      '🚀 ~ file: use-products-connector.js:61 ~ updateProductAction ~ products:',
      products
    );
    const filteredProducts = products.filter(
      (product) =>
        product?.isPublished !== (action === 'publish' ? true : false) ||
        product?.stagedChanges === true
    );

    const actionPayload =
      action === 'publish'
        ? [{ publish: { scope: 'All' } }]
        : [{ unpublish: { dummy: 'dumnmy' } }];

    if (filteredProducts.length <= 0) {
      throw 'No products Updated';
    }
    try {
      const data = await Promise.all(
        filteredProducts.map(async (arr) => {
          const { data, errors } = await updateProductStatus({
            variables: {
              id: arr.id,
              version: arr.version,
              actions: actionPayload,
            },
            context: {
              target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
            },
          });
          // if (errors) {
          //   throw errors;
          // }
        })
      );
      return data;
    } catch (error) {
      throw error;
    }
  };
  return { updateProductAction };
};

/**
 * Hook to handle product detail update
 */
export const useProductDetailsUpdater = () => {
  const [updateProductDetail, { loading }] = useMcMutation(UpdateProduct);

  const syncStore = createSyncProducts();

  const execute = async ({ oldDraft, newDraft }) => {
    /**
     * Will create an array of object by adding action names of updated fields
     */
    const actions = syncStore.buildActions(
      newDraft,
      convertToActionData(oldDraft)
    );
    try {
      return updateProductDetail({
        variables: {
          id: oldDraft.id,
          version: oldDraft.version,
          actions: createGraphQlUpdateActions(actions),
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: use-products-connector.js:127 ~ execute ~ error:',
        error
      );
      throw error;
    }
  };

  return { execute, loading };
};
