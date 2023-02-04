import RepositoryInterface from '../../@shared/repository/repostiroty.interface'
import Customer from '../entity/customer'

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
