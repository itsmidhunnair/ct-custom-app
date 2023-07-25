import {
  useMcMutation,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

import FetchProducts from './fetch-products.ctp.graphql';
import GetProductDetails from './fetch-product-details.ctp.graphql';
import UpdateProductStatus from './update-product-status.ctp.graphql';

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
  const [updateProductStatus] = useMcMutation(UpdateProductStatus);

  /**
   * To update status on array of product
   *
   * @param {{action:('publish'|'unpublish'), products:[{id:String, version:Int16Array, isPublished:boolean}]}}
   */
  const updateProductAction = async ({ action, products }) => {
    const filteredProducts = products.filter(
      (product) => product.isPublished !== (action === 'publish' ? true : false)
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
