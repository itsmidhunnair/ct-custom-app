const dayjs = require('dayjs');

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Calcutta');

/**
 ** CURRENT WEEK
 */
const currentWeekStartDate = dayjs().startOf('week').format('YYYY-MM-DD');
const currentWeekEndDate = dayjs().endOf('week').format('YYYY-MM-DD');

/**
 ** PREVIOUSE WEEK
 */
const previouseWeekStartDate = dayjs()
  .startOf('week')
  .subtract(1, 'w')
  .format('YYYY-MM-DD');
const previouseWeekEndDate = dayjs()
  .endOf('week')
  .subtract(1, 'w')
  .format('YYYY-MM-DD');

/**
 ** CURRENT MONTH
 */
const currentMonthStart = dayjs()
  .month(dayjs().month())
  .date(1)
  .hour(0)
  .minute(0)
  .second(0)
  .format('YYYY-MM-DD');

const currentMonthEnd = dayjs().endOf('M').format('YYYY-MM-DD');

/**
 ** PREVIOUSE MONTH
 */
const previousMonthStart = dayjs()
  .month(dayjs().month() - 1)
  .date(1)
  .hour(0)
  .minute(0)
  .second(0)
  .format('YYYY-MM-DD');

const previousMonthEnd = dayjs()
  .endOf('M')
  .subtract(1, 'M')
  .format('YYYY-MM-DD');

/**
 ** CURRENT YEAR
 */
const currentYearStart = dayjs().startOf('y').format('YYYY-MM-DD');
const currentYearEnd = dayjs().endOf('y').format('YYYY-MM-DD');

/**
 ** PREVIOUSE YEAR
 */
const previousYearStart = dayjs()
  .startOf('y')
  .subtract(1, 'y')
  .format('YYYY-MM-DD');
const previousYearEnd = dayjs()
  .endOf('y')
  .subtract(1, 'y')
  .format('YYYY-MM-DD');

console.log('-------------------------------------------');
console.log('CURRENT WEEK START', currentWeekStartDate);
console.log('CURRENT WEEK END', currentWeekEndDate);
console.log('-------------------------------------------');
console.log('PREVIOUSE WEEK START', previouseWeekStartDate);
console.log('PREVIOUSE WEEK END', previouseWeekEndDate);
console.log('-------------------------------------------');
console.log('CURRENT MONTH START', currentMonthStart);
console.log('CURRENT MONTH END', currentMonthEnd);
console.log('-------------------------------------------');
console.log('PREVIOUSE MONTH START', previousMonthStart);
console.log('PREVIOUSE MONTH END', previousMonthEnd);
console.log('-------------------------------------------');
console.log('CURRENT YEAR START', currentYearStart);
console.log('CURRENT YEAR END', currentYearEnd);
console.log('-------------------------------------------');
console.log('CURRENT YEAR START', previousYearStart);
console.log('CURRENT YEAR END', previousYearEnd);
console.log('-------------------------------------------');

const cartData = [
  {
    lastModifiedAt: '2023-06-26T05:48:31.982Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-06-26T06:21:46.248Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-07-12T10:47:54.184Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-07-13T11:32:24.328Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-13T12:42:24.975Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-14T06:23:30.595Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-07-14T07:06:07.840Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-07-17T13:12:08.490Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-18T19:26:55.797Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-07-17T13:29:22.269Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-17T13:40:37.097Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-18T03:21:06.853Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-07-18T04:42:20.324Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-18T04:52:29.908Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-07-18T04:54:28.394Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-18T05:26:30.411Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-18T05:28:37.807Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-18T05:29:23.502Z',
    cartState: 'Ordered',
  },
  {
    lastModifiedAt: '2023-07-19T07:24:49.896Z',
    cartState: 'Active',
  },
  {
    lastModifiedAt: '2023-07-19T07:28:14.396Z',
    cartState: 'Active',
  },
];

const dateData = [
  {
    lastModifiedAt: '2023-06-26T05:48:31.982Z',
  },

  {
    lastModifiedAt: '2023-06-26T06:21:46.248Z',
  },

  {
    lastModifiedAt: '2023-07-12T10:47:54.184Z',
  },

  {
    lastModifiedAt: '2023-07-13T11:32:24.328Z',
  },

  {
    lastModifiedAt: '2023-07-13T12:42:24.975Z',
  },

  {
    lastModifiedAt: '2023-07-14T06:23:30.595Z',
  },

  {
    lastModifiedAt: '2023-07-14T07:06:07.840Z',
  },

  {
    lastModifiedAt: '2023-07-17T13:12:08.490Z',
  },

  {
    lastModifiedAt: '2023-07-18T19:26:55.797Z',
  },

  {
    lastModifiedAt: '2023-07-17T13:29:22.269Z',
  },

  {
    lastModifiedAt: '2023-07-17T13:40:37.097Z',
  },

  {
    lastModifiedAt: '2023-07-18T03:21:06.853Z',
  },

  {
    lastModifiedAt: '2023-07-18T04:42:20.324Z',
  },

  {
    lastModifiedAt: '2023-07-18T04:52:29.908Z',
  },

  {
    lastModifiedAt: '2023-07-18T04:54:28.394Z',
  },

  {
    lastModifiedAt: '2023-07-18T05:26:30.411Z',
  },

  {
    lastModifiedAt: '2023-07-18T05:28:37.807Z',
  },

  {
    lastModifiedAt: '2023-07-18T05:29:23.502Z',
  },

  {
    lastModifiedAt: '2023-07-19T07:24:49.896Z',
  },

  {
    lastModifiedAt: '2023-07-19T07:28:14.396Z',
  },
];

const dates = dateData.map((data) => data.lastModifiedAt);
console.log(dates);
