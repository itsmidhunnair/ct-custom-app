import dayjs from 'dayjs';

/**
 * To generate current week date span (Sun -Sat)
 * @param {{type:'value'|'label'}}
 */
const getCurrWeek = ({ type = 'value' } = '') => {
  if (type && type === 'label') {
    return `This Week - ${dayjs()
      .startOf('week')
      .format('DD-MMM-YYYY')} to ${dayjs().endOf('week').format('DD-MMM-YYYY')}`;
  }
  return {
    start: dayjs().startOf('week').format('YYYY-MM-DD'),
    end: dayjs().endOf('week').format('YYYY-MM-DD'),
  };
};

/**
 * To generate previous week date span (Sun-Sat)
 * @param {{type:'value'|'label'}}
 */
const getPrevWeek = ({ type = 'value' } = '') => {
  if (type === 'label') {
    return `Previous week - ${dayjs()
      .startOf('week')
      .subtract(1, 'week')
      .format('DD-MMM-YYYY')} to ${dayjs()
      .endOf('week')
      .subtract(1, 'week')
      .format('DD-MMM-YYYY')}`;
  }
  return {
    start: dayjs().startOf('week').subtract(1, 'week').format('YYYY-MM-DD'),
    end: dayjs().endOf('week').subtract(1, 'week').format('YYYY-MM-DD'),
  };
};

/**
 * To get this month date span
 * @param {{type:'value'|'label'}}
 */
const getCurrMonth = ({ type = 'value' } = '') => {
  if (type === 'label') {
    return `This month - ${dayjs()
      .startOf('month')
      .format('DD-MMM-YYYY')} to ${dayjs().endOf('month').format('DD-MMM-YYYY')}`;
  }
  return {
    start: dayjs().startOf('month').format('YYYY-MM-DD'),
    end: dayjs().endOf('month').format('YYYY-MM-DD'),
  };
};

/**
 * To get previous month date
 * @param {{type:'value'|'label'}}
 */
const getPrevMonth = ({ type = 'value' } = '') => {
  if (type === 'label') {
    return `Previous month - ${dayjs()
      .startOf('month')
      .subtract(1, 'month')
      .format('DD-MMM-YYYY')} to ${dayjs()
      .endOf('month')
      .subtract(1, 'month')
      .format('DD-MMM-YYYY')}`;
  }
  return {
    start: dayjs().startOf('month').subtract(1, 'month').format('YYYY-MM-DD'),
    end: dayjs().endOf('month').subtract(1, 'month').format('YYYY-MM-DD'),
  };
};

/**
 * To get Current year date
 * @param {{type:'value'|'label'}}
 */
const getCurrYear = ({ type = 'value' } = '') => {
  if (type === 'label') {
    return `This year - ${dayjs()
      .startOf('year')
      .format('DD-MMM-YYYY')} to ${dayjs().endOf('year').format('DD-MMM-YYYY')}`;
  }
  return {
    start: dayjs().startOf('year').format('YYYY-MM-DD'),
    end: dayjs().endOf('year').format('YYYY-MM-DD'),
  };
};

/**
 * To get Previous year date
 * @param {{type:'value'|'label'}}
 */
const getPrevYear = ({ type = 'value' } = '') => {
  if (type === 'label') {
    return `Previous year - ${dayjs()
      .startOf('year')
      .subtract(1, 'year')
      .format('DD-MMM-YYYY')} to ${dayjs()
      .endOf('year')
      .subtract(1, 'year')
      .format('DD-MMM-YYYY')}`;
  }
  return {
    start: dayjs().startOf('year').subtract(1, 'year').format('YYYY-MM-DD'),
    end: dayjs().endOf('year').subtract(1, 'year').format('YYYY-MM-DD'),
  };
};

export {
  getCurrWeek,
  getPrevWeek,
  getCurrMonth,
  getPrevMonth,
  getCurrYear,
  getPrevYear,
};
