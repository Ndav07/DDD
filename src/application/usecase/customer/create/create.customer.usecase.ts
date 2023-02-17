import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import CustomerFactory from "../../../../domain/customer/factory/customer.factory";

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(input.name, input.address)
    await this.customerRepository.create(customer)
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