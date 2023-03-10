export interface InputListCustomerDto {}

type Customers = {
  id: string
  name: string
  address: {
    street: string
    city: string
    number: number
    zip: string
  }
}
export interface OutputListCustomerDto {
  customers: Customers[]
}