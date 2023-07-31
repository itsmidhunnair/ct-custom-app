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
  // console.log(
  // '🚀 ~ file: helpers.js:23 ~ formatCartDate ~ formatCartDate:',
  // formatCartDate
  // );

  if (dateArray && dateArray[0]?.lastModifiedAt) {
    formatCartDate = formatCartDate.map((cartDate) => ({
      date: dayjs(cartDate.date).add(14, 'd').format('YYYY-MM-DD'),
    }));
  }

  /**
   * creates array of object with unique date and the count date existed
   */
  if (dateArray && dateArray[0]?.createdAt) {
    const countWithDate = map(
      countBy(formatCartDate, 'date'),
      (value, date) => ({
        date,
        orders: value,
        carts: 0,
      })
    );

    return countWithDate;
  }
  if (dateArray && dateArray[0]?.lastModifiedAt) {
    const countWithDate = map(
      countBy(formatCartDate, 'date'),
      (value, date) => ({
        date,
        carts: value,
        orders: 0,
      })
    );

    return countWithDate;
  }
};

/**
 * Merge both array and accordingly calculate count based on key
 *
 */
const mergeArrayOfObj = (Arr1 = [], Arr2 = []) => {
  const mergeArr = [...Arr1, ...Arr2];

  const mergedArray = [];

  const dateMap = new Map();

  mergeArr &&
    mergeArr.forEach((item) => {
      if (dateMap.has(item.date)) {
        const existingItem = dateMap.get(item.date);
        existingItem.orders += item.orders;
        existingItem.carts += item.carts;
      } else {
        dateMap.set(item.date, { ...item });
      }
    });

  dateMap.forEach((item) => mergedArray.push(item));

  const sortedArray = mergedArray.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return sortedArray;
};

export { dateCountXYcoordinates, mergeArrayOfObj };
