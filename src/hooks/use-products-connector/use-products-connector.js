import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

import FetchProducts from './fetch-products.ctp.graphql';
import GetProductDetails from './fetch-product-details.ctp.graphql';

/**
 * To Fetch all Products
 *
 * @returns
 */
export const useProductsFetcher = ({ page, perPage, tableSorting }) => {
  const { data, loading, error } = useMcQuery(FetchProducts, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  return { data: data?.products, loading, error };
};

export const useProductDetailsFetcher = ({ id }) => {
  console.log(
    '🚀 ~ file: use-products-connector.js:27 ~ useProductDetailsFetcher ~ id:',
    id
  );
  const { data, error, loading } = useMcQuery(GetProductDetails, {
    variables: {
      id,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  console.log(
    '🚀 ~ file: use-products-connector.js:36 ~ useProductDetailsFetcher ~ data:',
    data
  );
  return { product: data?.product, loading, error };
};
