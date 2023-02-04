import Order from '../entity/order'
import RepositoryInterface from '../../@shared/repository/repostiroty.interface'

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
