import dayjs from 'dayjs';

let dateFormat = 'YYYY-MM-DD';
/**
 * To generate current week date span (Sun -Sat)
 * @param {{type:'value'|'label'}}
 */
const getCurrWeek = ({ type = 'value' } = '') => {
  if (type && type === 'label') {
    dateFormat = 'DD-MMM-YYYY';
  }
  return {
    start: dayjs().startOf('week').format(dateFormat),
    end: dayjs().endOf('week').format(dateFormat),
  };
};

/**
 * To generate previous week date span (Sun-Sat)
 * @param {{type:'value'|'label'}}
 */
const getPrevWeek = ({ type = 'value' } = '') => {
  if (type === 'label') {
    dateFormat = 'DD-MMM-YYYY';
  }
  return {
    start: dayjs().startOf('week').subtract(1, 'week').format(dateFormat),
    end: dayjs().endOf('week').subtract(1, 'week').format(dateFormat),
  };
};

/**
 * To get this month date span
 * @param {{type:'value'|'label'}}
 */
const getCurrMonth = ({ type = 'value' } = '') => {
  if (type === 'label') {
    dateFormat = 'DD-MMM-YYYY';
  }
  return {
    start: dayjs().startOf('month').format(dateFormat),
    end: dayjs().endOf('month').format(dateFormat),
  };
};

/**
 * To get previous month date
 * @param {{type:'value'|'label'}}
 */
const getPrevMonth = ({ type = 'value' } = '') => {
  if (type === 'label') {
    dateFormat = 'DD-MMM-YYYY';
  }
  return {
    start: dayjs().startOf('month').subtract(1, 'month').format(dateFormat),
    end: dayjs().endOf('month').subtract(1, 'month').format(dateFormat),
  };
};

/**
 * To get Current year date
 * @param {{type:'value'|'label'}}
 */
const getCurrYear = ({ type = 'value' } = '') => {
  if (type === 'label') {
    dateFormat = 'DD-MMM-YYYY';
  }
  return {
    start: dayjs().startOf('year').format(dateFormat),
    end: dayjs().endOf('year').format(dateFormat),
  };
};

/**
 * To get Previous year date
 * @param {{type:'value'|'label'}}
 */
const getPrevYear = ({ type = 'value' } = '') => {
  if (type === 'label') {
    dateFormat = '';
  }
  return {
    start: dayjs().startOf('year').subtract(1, 'year').format(dateFormat),
    end: dayjs().endOf('year').subtract(1, 'year').format(dateFormat),
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
