import Address from '../../../../domain/entity/address/address'
import Customer from '../../../../domain/entity/customer/customer'
import CustomerRepositoryInterface from '../../../../domain/repository/customer_repository/customer.repository.interface'
import CustomerModel from '../../db/model/customer/customer.model'

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.getId(),
      name: entity.getName(),
      street: entity.getAddress().getStreet(),
      number: entity.getAddress().getNumber(),
      zipcode: entity.getAddress().getZip(),
      city: entity.getAddress().getCity(),
      active: entity.isActive(),
      rewardPoints: entity.getRewardPoints(),
    })
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.getName(),
        street: entity.getAddress().getStreet(),
        number: entity.getAddress().getNumber(),
        zipcode: entity.getAddress().getZip(),
        city: entity.getAddress().getCity(),
        active: entity.isActive(),
        rewardPoints: entity.getRewardPoints(),
      },
      {
        where: {
          id: entity.getId(),
        },
      }
    )
  }

  async find(id: string): Promise<Customer> {
    let customerModel
    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      })
    } catch (error) {
      throw new Error('Customer not found')
    }
    const customer = new Customer(id, customerModel.name)
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    )
    customer.changeAddress(address)
    return customer
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll()
    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name)
      customer.addPoints(customerModel.rewardPoints)
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      )
      customer.changeAddress(address)
      if (customerModel.active === false) customer.deactivate()
      return customer
    })
    return customers
  }
}
