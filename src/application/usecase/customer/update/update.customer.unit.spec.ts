import CustomerFactory from "../../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('Níkollas', {city: 'Altas', number: 321, street: 'Luiz Antonio', zip: '45678-00'})

const input = {
  id: customer.getId(),
  name: 'Níkollas Update',
  address: {
    city: 'Altas update',
    number: 123,
    street: 'Luiz Aupdate',
    zip: '5432780'
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test for customer update use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository()
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository)

    const output = await updateCustomerUseCase.execute(input)

    expect(output).toEqual(input)
  })
})