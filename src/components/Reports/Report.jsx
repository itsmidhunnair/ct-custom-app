import { PageContentFull } from '@commercetools-frontend/application-components';
import { Chart as ChartJs } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Card from '@commercetools-uikit/card';

import _, { uniq } from 'lodash';

import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import dayjs from 'dayjs';
import useReport from '../../hooks/useReport/useReport';

const dateData = [
  {
    lastModifiedAt: '2023-04-26T13:59:26.034Z',
    createdAt: '2023-04-26T13:59:06.903Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-04-28T13:08:13.178Z',
    createdAt: '2023-04-28T13:02:45.783Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-05-02T10:54:36.003Z',
    createdAt: '2023-05-02T10:54:00.122Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-05-02T10:54:37.327Z',
    createdAt: '2023-05-01T06:46:12.716Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-05-02T10:55:29.946Z',
    createdAt: '2023-05-02T10:54:36.342Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-05-17T06:24:32.974Z',
    createdAt: '2023-05-05T08:23:18.978Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-05-22T09:16:02.219Z',
    createdAt: '2023-05-22T09:14:54.602Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-05-22T09:22:30.655Z',
    createdAt: '2023-05-22T09:16:02.605Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-02T07:38:48.239Z',
    createdAt: '2023-05-02T07:55:28.526Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-02T07:51:52.756Z',
    createdAt: '2023-06-02T07:39:28.799Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-14T06:57:22.011Z',
    createdAt: '2023-06-02T07:41:58.832Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-21T06:07:54.106Z',
    createdAt: '2023-06-21T06:06:47.586Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-21T14:07:45.791Z',
    createdAt: '2023-06-21T14:02:30.421Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-22T07:44:50.096Z',
    createdAt: '2023-06-21T06:53:49.067Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-06-22T08:53:09.159Z',
    createdAt: '2023-06-22T08:42:37.727Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-23T09:46:09.518Z',
    createdAt: '2023-06-23T09:44:39.922Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-06-23T10:11:55.900Z',
    createdAt: '2023-06-23T10:03:25.440Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-23T10:38:22.879Z',
    createdAt: '2023-06-23T10:30:34.413Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-23T10:38:33.271Z',
    createdAt: '2023-06-23T10:36:45.396Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-06-23T10:41:05.369Z',
    createdAt: '2023-06-23T10:38:33.619Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-23T10:56:50.577Z',
    createdAt: '2023-06-23T10:56:37.979Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-26T10:32:07.625Z',
    createdAt: '2023-06-23T09:46:09.907Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-27T07:47:25.257Z',
    createdAt: '2023-06-27T07:11:21.691Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-07-05T07:14:19.331Z',
    createdAt: '2023-07-04T14:03:56.791Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-07T07:27:08.613Z',
    createdAt: '2023-06-22T07:44:50.574Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-19T10:44:15.870Z',
    createdAt: '2023-07-19T07:39:08.942Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-07-26T06:36:27.364Z',
    createdAt: '2023-05-05T11:39:20.719Z',
    cartState: 'Active',
  },
];

const activeCart = dateData.filter((item) => item.cartState === 'Active');
const orderedCart = dateData.filter((item) => item.cartState === 'Ordered');

const activeDates = activeCart.map((data) => ({
  ...data,
  lastModifiedAt: dayjs(data.lastModifiedAt).format('YYYY/MM/DD'),
}));

const orderDates = orderedCart.map((data) => ({
  ...data,
  lastModifiedAt: dayjs(data.lastModifiedAt).format('YYYY/MM/DD'),
}));

const activeResult = _(activeDates)
  .groupBy('lastModifiedAt')
  .map((items, lastModifiedAt) => ({ lastModifiedAt, active: items.length }))
  .value();

const orderResult = _(orderDates)
  .groupBy('lastModifiedAt')
  .map((items, lastModifiedAt) => ({ lastModifiedAt, ordered: items.length }))
  .value();

const data = {
  labels: activeResult.map((item) => new Date(item.lastModifiedAt)),
  datasets: [
    {
      label: 'Abandoned',
      data: activeResult.map((item) => item.count),
      fill: true,
      borderColor: '#4f5056',
      backgroundColor: '#4f50564a',
      borderWidth: 1,
    },
    // {
    //   label: 'Sold',
    //   data: activeResult.map(
    //     (item) => item.count + ((Math.random() * 6) / 2) * 9
    //   ),
    //   fill: true,
    //   borderColor: '#0fb3b3',
    //   backgroundColor: '#0fb3b35c',
    //   borderWidth: 1,
    // },
  ],
};

const Report = () => {
  const { abandonedCarts, error, loading, soldCarts } = useReport({
    startDate: '2023-05-01',
    endDate: '2023-05-31',
  });

  console.log(abandonedCarts, error, loading, soldCarts);

  return (
    <>
      <PageContentFull>
        <Card theme="light" type="raised">
          <Line
            data={data}
            options={{
              elements: {
                line: {
                  tension: 0.4,
                },
              },
              scales: {
                x: {
                  min: '2023-04-20',
                  max: '2023-05-05',
                  type: 'time',
                  time: {
                    unit: 'day',
                  },
                  ticks: {
                    autoSkip: true,
                  },
                },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </Card>
        <Card theme="light" type="raised">
          <Line
            data={{
              datasets: [
                {
                  label: 'Abandoned',
                  data: activeResult.map((item) => ({
                    x: new Date(item.lastModifiedAt),
                    y: item.active,
                  })),

                  borderWidth: 1,
                  fill: true,

                  borderColor: '#4f5056',
                  backgroundColor: '#4f50564a',

                  // lineJoint: 'round',
                  // spanGaps: true,
                },
                {
                  label: 'Sold',
                  data: orderResult.map((item) => ({
                    x: new Date(item.lastModifiedAt),
                    y: item.ordered,
                  })),
                  borderColor: 'rgba(255, 0, 0, 1)',
                  borderWidth: 1,
                  fill: true,
                  // lineJoint: 'round',
                  // spanGaps: true,
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.4,
                },
              },
              scales: [
                {
                  // min: '2023-01-01',
                  // max: '2023-12-31',
                  axis: 'x',
                  type: 'time',
                  time: {
                    unit: 'day',
                  },

                  // type: 'time',
                  //       distribution: 'linear',
                  //       time: {
                  //         unit: 'hour',
                  //         stepSize: 2,
                  //       },
                  //     },
                },
              ],
              // scales: {
              //   xAxes: [
              //     {
              //       type: 'time',
              //       distribution: 'linear',
              //       time: {
              //         unit: 'hour',
              //         stepSize: 2,
              //       },
              //     },
              //   ],
              // },
            }}
          />
        </Card>
      </PageContentFull>
    </>
  );
};

export default Report;
