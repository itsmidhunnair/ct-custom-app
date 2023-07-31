import { PageContentFull } from '@commercetools-frontend/application-components';
import { Chart as ChartJs } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Card from '@commercetools-uikit/card';
import { merge } from 'lodash';
import dayjs from 'dayjs';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import useReport from '../../hooks/useReport/useReport';
import { dateCountXYcoordinates, mergeArrayOfObj } from './helpers';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import SelectField from '@commercetools-uikit/select-field';
import { useState } from 'react';
import {
  getCurrMonth,
  getCurrWeek,
  getCurrYear,
  getPrevMonth,
  getPrevWeek,
  getPrevYear,
} from './generateDate';

const Report = () => {
  const [dateTobeFetched, setDateTobeFetched] = useState(getCurrWeek());

  const { abandonedCarts, error, loading, soldCarts } = useReport({
    startDate: dateTobeFetched.start,
    endDate: dateTobeFetched.end,
  });

  console.log(
    '🚀 ~ file: Report.jsx:17 ~ Report ~ dateTobeFetched:',
    dateTobeFetched
  );
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

  /**
   * Merging both array
   */
  const mergedArray = mergeArrayOfObj(
    orderCountWithDate,
    abandonedCountWithDate
  );

  const options = [
    {
      label: getCurrWeek({ type: 'label' }),
      value: JSON.stringify(getCurrWeek()),
    },
    {
      label: getPrevWeek({ type: 'label' }),
      value: JSON.stringify(getPrevWeek()),
    },
    {
      label: getCurrMonth({ type: 'label' }),
      value: JSON.stringify(getCurrMonth()),
    },
    {
      label: getPrevMonth({ type: 'label' }),
      value: JSON.stringify(getPrevMonth()),
    },
    {
      label: getCurrYear({ type: 'label' }),
      value: JSON.stringify(getCurrYear()),
    },
    {
      label: getPrevYear({ type: 'label' }),
      value: JSON.stringify(getPrevYear()),
    },
  ];

  return (
    <>
      <PageContentFull>
        <SelectField
          title="State"
          value={JSON.stringify(dateTobeFetched)}
          options={options}
          onChange={(e) => {
            console.log(
              '🚀 ~ file: Report.jsx:93 ~ Report ~ e:',
              e.target.value
            );
            setDateTobeFetched(JSON.parse(e.target.value));
          }}
        />
        <Card theme="dark" type="raised">
          <Line
            // ref={(reference) => (reference )}
            data={{
              labels: mergedArray.map((item) => item.date),
              datasets: [
                {
                  label: 'Ordered',
                  data: mergedArray.map((item) => item.orders),
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
                  data: mergedArray.map((item) => item.carts),
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
                mode: 'index',
                intersect: false,
              },
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'month',
                  },
                  grid: {
                    display: true,
                    // color: '#348632',
                  },
                  ticks: {
                    autoSkip: true,
                    sampleSize: 50,
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
