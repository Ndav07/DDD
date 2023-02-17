import Customer from '../entity/customer'
import { v4 as uuid } from 'uuid'
import Address from '../entity/value-object/address'

interface AddressObj {
  street: string
  city: string
  number: number
  zip: string
}

export default class CustomerFactory {
  static create(name: string): Customer {
    return new Customer(uuid(), name)
  }

  static createWithAddress(name: string, addressobj: AddressObj): Customer {
    const customer = new Customer(uuid(), name)
    const address = new Address(addressobj.street, addressobj.number, addressobj.zip, addressobj.city)
    customer.changeAddress(address)
    return customer
  }
}
