import OrderItem from "./order_item"

export default class Order {
  private id: string
  private customerID: string
  private items: OrderItem[]

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this.id = id
    this.customerID = customerId
    this.items = items
    this.validate()
  }

  validate() {
    if(this.id.length === 0) {
      throw new Error("Id is required")
    }
    if(this.customerID.length === 0) {
      throw new Error("Customer is required")
    }
    if(this.items.length === 0) {
      throw new Error("Items quantity must be greater than 0")
    }
  }

  totalOrder(): number {
    return this.items.reduce((acc, item) => acc + item.getPrice(), 0)
  }
}