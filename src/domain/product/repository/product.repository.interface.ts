import Product from '../entity/product'
import RepositoryInterface from '../../@shared/repository/repostiroty.interface'

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
