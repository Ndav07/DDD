import Address from "../../../../domain/customer/entity/value-object/address";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id)
    customer.changeName(input.name)
    customer.changeAddress(new Address(input.address.street, input.address.number, input.address.zip, input.address.city))
    await this.customerRepository.update(customer)
    return {
      id: customer.getId(),
      name: customer.getName(),
      address: {
        street: customer.getAddress().getStreet(),
        city: customer.getAddress().getCity(),
        number: customer.getAddress().getNumber(),
        zip: customer.getAddress().getZip()
      }
    }
  }
}