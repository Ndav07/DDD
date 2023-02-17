import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import { OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll()
    return {
      customers: customers.map((customer) => ({
        id: customer.getId(),
        name: customer.getName(),
        address: {
          street: customer.getAddress().getStreet(),
          city: customer.getAddress().getCity(),
          number: customer.getAddress().getNumber(),
          zip: customer.getAddress().getZip()
        }
      }))
    }
  }
}