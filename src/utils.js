/**
 * Utility for converting date object to unix timestamp.
 * @param {Date} Date object.
 * @returns {number} Unix timestamp.
 * @since 1.0.0
 */
export function toTimestamp(date = Date.now()) {
  return Math.round(Date.parse(date) / 1000);
}

export const formatPrice = (num) => {
  return Number(num.toFixed(1)).toLocaleString() + "€ ";
};
