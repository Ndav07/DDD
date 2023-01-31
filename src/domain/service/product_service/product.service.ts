import Product from '../../entity/product/product'

export default class ProductService {
  static increasePrice(product: Product[], porcentagem: number) {
    product.forEach((product) => {
      product.changePrice(product.getPrice() * (porcentagem / 100 + 1))
    })
  }
}
