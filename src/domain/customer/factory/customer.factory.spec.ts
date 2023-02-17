import Address from "../entity/value-object/address"
import CustomerFactory from "./customer.factory"

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    let customer = CustomerFactory.create('John')

    expect(customer.getId()).toBeDefined()
    expect(customer.getName()).toBe('John')
    expect(customer.getAddress()).toBeUndefined()
  })

  it('should create a customer with an address', () => {
    const address = {
      street: 'Rua',
      number: 222,
      zip: 'Zip',
      city: 'City'
    }

    let customer = CustomerFactory.createWithAddress('John', address)

    expect(customer.getId()).toBeDefined()
    expect(customer.getName()).toBe('John')
    expect(customer.getAddress()).toEqual(address)
  })
})
