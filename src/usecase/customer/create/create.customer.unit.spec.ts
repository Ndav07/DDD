import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
  name: 'Níkollas',
  address: {
    street: 'Rua',
    number: 222,
    zip: 'Zip',
    city: 'City'
  }
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    const output = await createCustomerUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city
      }
    })
  })

  it('should thrown an error when name is missing', async () => {
    const customerRepository = MockRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    input.name = ''

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow('Name is required')
  })
  
  it('should thrown an error when street is missing', async () => {
    const customerRepository = MockRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    input.name = 'Níkollas'
    input.address.street = ''

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow('Street is required')
  })

  it('should thrown an error when city is missing', async () => {
    const customerRepository = MockRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    input.address.street = 'Street'
    input.address.city= ''

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow('City is required')
  })

  it('should thrown an error when zip is missing', async () => {
    const customerRepository = MockRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    input.address.city= 'City'
    input.address.zip = ''

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow('Zip is required')
  })

  it('should thrown an error when number is missing', async () => {
    const customerRepository = MockRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    input.address.zip = 'Zip'
    input.address.number = 0

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow('Number is required')
  })
}) 