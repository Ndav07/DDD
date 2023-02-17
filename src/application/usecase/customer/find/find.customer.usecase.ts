import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id)

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