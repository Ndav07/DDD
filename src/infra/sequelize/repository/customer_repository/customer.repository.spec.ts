import { Sequelize } from 'sequelize-typescript'
import Address from '../../../../domain/entity/address/address'
import Customer from '../../../../domain/entity/customer/customer'
import CustomerModel from '../../db/model/customer/customer.model'
import CustomerRepository from './customer.repository'

describe('Customer repository test', () => {
  let sequileze: Sequelize

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequileze.addModels([CustomerModel])
    await sequileze.sync()
  })

  afterEach(async () => {
    await sequileze.close()
  })

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer1')
    const address = new Address('Street1', 1, 'Zipcode1', 'City1')
    customer.changeAddress(address)

    await customerRepository.create(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: '123' } })

    expect(customerModel?.toJSON()).toStrictEqual({
      id: '123',
      name: customer.getName(),
      street: address.getStreet(),
      number: address.getNumber(),
      zipcode: address.getZip(),
      city: address.getCity(),
      active: customer.isActive(),
      rewardPoints: customer.getRewardPoints()
    })
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer1')
    const address = new Address('Street1', 1, 'Zipcode1', 'City1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    customer.changeName('Customer2')
    await customerRepository.update(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '123' } })

    expect(customerModel?.toJSON()).toStrictEqual({
      id: '123',
      name: 'Customer2',
      street: address.getStreet(),
      number: address.getNumber(),
      zipcode: address.getZip(),
      city: address.getCity(),
      active: customer.isActive(),
      rewardPoints: customer.getRewardPoints()
    })
  })

  it('should found a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer1')
    const address = new Address('Street1', 1, 'Zipcode1', 'City1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const customerFound = await customerRepository.find(customer.getId())

    expect(customer).toStrictEqual(customerFound)
  })

  it('should throw an error when customer if not found', async () => {
    const customerRepository = new CustomerRepository()
    
    expect(async () => {
      await customerRepository.find('123')
    }).rejects.toThrow('Customer not found')
  })

  it('should found all customers', async () => {
    const customerRepository = new CustomerRepository()
    const customer1 = new Customer('123', 'Customer1')
    const address1 = new Address('Street1', 1, 'Zipcode1', 'City1')
    customer1.changeAddress(address1)
    
    const customer2 = new Customer('231', 'Customer2')
    const address2 = new Address('Street2', 2, 'Zipcode2', 'City2')
    customer2.changeAddress(address2)
    customer2.addPoints(23)
    
    const customers = [customer1, customer2]
    
    await customerRepository.create(customer1)
    await customerRepository.create(customer2)

    const customersFound = await customerRepository.findAll()

    expect(customersFound).toHaveLength(2)
    expect(customers).toEqual(customersFound)
  })
})