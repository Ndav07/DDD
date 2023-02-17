import { Sequelize } from "sequelize-typescript"
import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/entity/value-object/address"
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository"
import FindCustomerUseCase from "./find.customer.usecase"

describe('Test find customer use case', () => {
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

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer('123', 'Níkollas')
    const address = new Address('Rua', 10, '63196-987', 'Juazeiro')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const input = {
      id: '123'
    }

    const output = {
      id: "123",
      name: 'Níkollas',
      address: {
        street: 'Rua',
        city: 'Juazeiro',
        number: 10,
        zip: '63196-987',
      }
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })
})