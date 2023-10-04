const priceToDisplay = (price: number) =>
  price
    ? Number(
        price.toString().substring(0, price.toString().length - 2)
      ).toFixed(2)
    : '0';
export default priceToDisplay;
