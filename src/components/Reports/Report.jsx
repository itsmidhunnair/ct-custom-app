import { PageContentFull } from '@commercetools-frontend/application-components';
import { Chart as ChartJs } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Card from '@commercetools-uikit/card';

import dayjs from 'dayjs';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import useReport from '../../hooks/useReport/useReport';
import { dateCountXYcoordinates } from './helpers';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const Report = () => {
  const { abandonedCarts, error, loading, soldCarts } = useReport({
    startDate: '2023-05-01',
    endDate: '2023-05-31',
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  /**
   * Creates X,Y coordinates for Order Data
   */
  const orderCountWithDate = dateCountXYcoordinates(soldCarts?.results);

  /**
   * Creates X,Y coordinates for Abandoned Data
   */
  const abandonedCountWithDate = dateCountXYcoordinates(
    abandonedCarts?.results
  );

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
              plugins: {
                tooltip: {
                  callbacks: {
                    title: (context) => {
                      return dayjs(context[0]?.label).format('D MMM YY, ddd');
                    },
                  },
                },
              },
            }}
          />
        </Card>
      </PageContentFull>
    </>
  );
};

export default Report;
