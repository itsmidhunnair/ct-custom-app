import { PageContentFull } from '@commercetools-frontend/application-components';
import { Chart as ChartJs } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Card from '@commercetools-uikit/card';

import { map, uniq, groupBy, countBy } from 'lodash';

import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import dayjs from 'dayjs';
import useReport from '../../hooks/useReport/useReport';

const Report = () => {
  const { abandonedCarts, error, loading, soldCarts } = useReport({
    startDate: '2023-05-01',
    endDate: '2023-05-31',
  });

  // ---------- Operations related to Abandoned Cart -------------------//

  /**
   * To Format abandoned cart date in YYYY-MM-DD format
   */
  let formatAbandonedCartDate = abandonedCarts?.results.map((cart) => ({
    lastModifiedAt: dayjs(cart.lastModifiedAt).format('YYYY-MM-DD'),
  }));
  console.log(
    '🚀 ~ file: Report.jsx:182 ~ abandonedCartDateWithCount ~ formatAbandonedCartDate:',
    formatAbandonedCartDate
  );

  /**
   * creates array of object with unique date and the count date existed
   */
  const abandonedCountWithDate = map(
    countBy(formatAbandonedCartDate, 'lastModifiedAt'),
    (value, date) => ({ x: date, y: value })
  );

  console.log(
    '🚀 ~ file: Report.jsx:180 ~ Report ~ abandonedCountWithDate:',
    abandonedCountWithDate
  );

  // ---------- Operations related to Abandoned Cart -------------------//

  // ---------- Operations related to Orders ---------------------------//

  /**
   * To Format abandoned cart date in YYYY-MM-DD format
   */
  let formatOrderDate = soldCarts?.results.map((cart) => ({
    createdAt: dayjs(cart.createdAt).format('YYYY-MM-DD'),
  }));
  console.log(
    '🚀 ~ file: Report.jsx:182 ~ abandonedCartDateWithCount ~ formatOrderDate:',
    formatOrderDate
  );

  /**
   * creates array of object with unique date and the count date existed
   */
  const orderCountWithDate = map(
    countBy(formatOrderDate, 'createdAt'),
    (value, date) => ({ x: date, y: value })
  );

  console.log(
    '🚀 ~ file: Report.jsx:180 ~ Report ~ orderCountWithDate:',
    orderCountWithDate
  );

  // ---------- Operations related to Orders ---------------------------//

  // //----- Graph Gradient Config ---------
  // var gradient = ctx.createLinearGradient(0, 0, 0, 400);
  // gradient.addColorStop(0, 'rgba(250,174,50,1)');
  // gradient.addColorStop(1, 'rgba(250,174,50,0)');

  // //----- Graph Gradient Config ---------

  return (
    <>
      <PageContentFull>
        <Card theme="dark" type="raised">
          <Line
            data={{
              datasets: [
                {
                  label: 'Ordered',
                  data: orderCountWithDate,
                  borderWidth: 1,
                  fill: true,
                  borderColor: '#008071',
                  backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                    gradient.addColorStop(0, '#00b39eFF');
                    gradient.addColorStop(1, '#00b39e00');
                    return gradient;
                  },
                  hoverBackgroundColor: '#008071',
                },
                {
                  label: 'Abandoned',
                  data: abandonedCountWithDate,
                  borderWidth: 1,
                  fill: true,
                  borderColor: '#4f5056',
                  backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 550);
                    gradient.addColorStop(0, '#4b4b4bFF');
                    gradient.addColorStop(1, '#4b4b4b00');
                    return gradient;
                  },
                  hoverBackgroundColor: '#201f1f',
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.4,
                },
              },
              interaction: {
                mode: 'x',
                intersect: false,
              },
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day',
                  },
                  grid: {
                    display: true,
                    // color: '#348632',
                  },
                  ticks: {
                    autoSkip: true,
                    sampleSize: 10,
                    major: {
                      enabled: true,
                    },
                  },
                  border: {
                    display: true,
                    dash: [15, 5],
                  },
                  title: {
                    align: 'center',
                    color: '#000',
                    display: true,
                    text: 'Date',
                  },
                  alignToPixels: true,
                },
                y: {
                  title: {
                    align: 'center',
                    color: '#000',
                    display: true,
                    text: 'Count',
                  },

                  border: {
                    display: true,
                    dash: [15, 5],
                  },
                  grid: {
                    display: true,
                    drawOnChartArea: true,
                  },
                },
              },
              animations: {
                tension: {
                  duration: 2000,
                  easing: 'easeInOutElastic',
                  from: 0,
                  to: 0.4,
                },
              },

              // type: 'time',
              //       distribution: 'linear',
              //       time: {
              //         unit: 'hour',
              //         stepSize: 2,
              //       },
              //     },
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
