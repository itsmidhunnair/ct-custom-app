import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import dayjs from 'dayjs';

import fetchOrderAndCart from './fetchOrderAndCart.graphql';

const useReport = ({ startDate, endDate }) => {
  // ---------- Will get an week span in which carts are abandoned --------------------------

  /**
   * Will give 14 days prior to startDate
   */
  const oldCartStartDate = dayjs(startDate)
    .subtract(14, 'd')
    .format('YYYY-MM-DD');

  /**
   * Will give 14 days prior to endDate
   */
  const oldCartEndDate = dayjs(endDate).subtract(14, 'd').format('YYYY-MM-DD');

  //-----------------------------------------------------------------------------------------

  const { data, error, loading } = useMcQuery(fetchOrderAndCart, {
    variables: {
      //Will return all those carts that are active but are not used in 14 days.
      cartwhere: `lastModifiedAt > "${oldCartStartDate}" and lastModifiedAt < "${oldCartEndDate}" and ( cartState =  "Active" )`,

      //Will return all the orders which are created with in the specified date range
      orderwhere: `createdAt >= "${startDate}" and createdAt <= "${endDate}" `,

      cartsort: [`lastModifiedAt asc`],
      ordersort: [`createdAt asc`],
      limit: 500,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  console.log('🚀 ~ file: useReport.js:40 ~ useReport ~ data:', data);

  return {
    abandonedCarts: data?.abandonedCarts,
    soldCarts: data?.soldCarts,
    error,
    loading,
  };
};

export default useReport;
