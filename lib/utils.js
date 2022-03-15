export const formatPrice = (num) => {
  return Number(num.toFixed(1)).toLocaleString() + "€ ";
};
