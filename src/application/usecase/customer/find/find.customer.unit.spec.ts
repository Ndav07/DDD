import Customer from "../../../../domain/customer/entity/customer"
import Address from "../../../../domain/customer/entity/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

const customer = new Customer('123', 'Níkollas')
const address = new Address('Rua', 10, '63196-987', 'Juazeiro')
customer.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

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

  it('should not find a customer', async () => {
    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: '123'
    }

    expect(() => {
      return usecase.execute(input)
    }).rejects.toThrow('Customer not found')
  })
})