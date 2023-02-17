import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import ListCustomerUseCase from "./list.customer.usecase"

const customer1 = CustomerFactory.createWithAddress('Níkollas', {city: 'Altas', number: 321, street: 'Luiz Antonio', zip: '45678-00'})
const customer2 = CustomerFactory.createWithAddress('David', {city: 'Altas', number: 444, street: 'Peixoto', zip: '45666-00'})

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test list customer use case', () => {
  it('should list a customer', async () => {
    const customerRepository = MockRepository()
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository)

    const output = await listCustomerUseCase.execute()

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].id).toBe(customer1.getId())
    expect(output.customers[0].name).toBe(customer1.getName())
    expect(output.customers[0].address.street).toBe(customer1.getAddress().getStreet())

    expect(output.customers[1].id).toBe(customer2.getId())
    expect(output.customers[1].name).toBe(customer2.getName())
    expect(output.customers[1].address.street).toBe(customer2.getAddress().getStreet())
  })
})