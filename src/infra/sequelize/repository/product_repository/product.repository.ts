import Product from '../../../../domain/entity/product/product'
import ProductRepositoryInterface from '../../../../domain/repository/product_repository/product.repository.interface'
import ProductModel from '../../db/model/product/product.model'

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.getId(),
      name: entity.getName(),
      price: entity.getPrice(),
    })
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.getName(),
        price: entity.getPrice(),
      },
      {
        where: {
          id: entity.getId(),
        },
      }
    )
  }

  async find(id: string): Promise<Product> {
    let productModel
    try {
      productModel = await ProductModel.findOne({ where: { id }, rejectOnEmpty: true })
    } catch (error) {
      throw new Error('Product not found')
    }
    return new Product(productModel.id, productModel.name, productModel.price)
  }

  async findAll(): Promise<Product[]> {
    const productsModel = await ProductModel.findAll()
    return productsModel.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    )
  }
}
