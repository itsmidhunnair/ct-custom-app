import dayjs from 'dayjs';
import { map, countBy } from 'lodash';

/**
 * Generate {x,y} Coordinates based on array of date object
 *
 * Will group duplicate dates, increases the count based
 * on it and create a an object with date and values
 *
 * @param {[{lastModifiedAt:String} | {createdAt:String}]} dateArray
 * @param {String} key
 *
 * @returns {[{x:String, y:Int}]}
 *
 */
const dateCountXYcoordinates = (dateArray) => {
  /**
   * To Format date in each object to YYYY-MM-DD format
   */
  let formatCartDate = dateArray?.map((cart) => ({
    date: dayjs(cart.lastModifiedAt || cart.createdAt).format('YYYY-MM-DD'),
  }));

  /**
   * creates array of object with unique date and the count date existed
   */
  const countWithDate = map(countBy(formatCartDate, 'date'), (value, date) => ({
    x: date,
    y: value,
  }));

  return countWithDate;
};

export { dateCountXYcoordinates };
