import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import dayjs from 'dayjs';

import fetchOrderAndCart from './fetchOrderAndCart.graphql';

const useReport = ({ startDate, endDate }) => {
  const oldCartStartDate = dayjs(startDate)
    .subtract(14, 'D')
    .format('YYYY-MM-DD');

  const oldCartEndDate = dayjs(endDate).subtract(14, 'D').format('YYYY-MM-DD');

  console.log(
    '🚀 ~ file: useReport.js:9 ~ useReport ~ oldCartStartDate:',
    oldCartStartDate,
    oldCartEndDate
  );

  const { data, error, loading } = useMcQuery(fetchOrderAndCart, {
    variables: {
      cartwhere: `lastModifiedAt > "${oldCartStartDate}" and lastModifiedAt < "${oldCartEndDate}" and ( cartState =  "Active" )`,
      orderwhere: `createdAt >= "${startDate}" and createdAt <= "${endDate}" `,
      cartsort: [`lastModifiedAt asc`],
      ordersort: [`createdAt asc`],
      limit: 500,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  console.log("🚀 ~ file: useReport.js:32 ~ useReport ~ data:", data)

  return {
    abandonedCarts: data?.abandonedCarts,
    soldCarts: data?.soldCarts,
    error,
    loading,
  };
};

export default useReport;
