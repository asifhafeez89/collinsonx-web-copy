enum Product {
  PP = 'PP',
  LK = 'LK',
  Cergea = 'Cergea',
}

export function getProducts(): Array<Product> {
  return [Product.PP, Product.LK, Product.Cergea];
}

export default Product;
