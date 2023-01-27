import OrderItem from "./order_item"

export default class Order {
  private id: string
  private customerID: string
  private items: OrderItem[]
  private total: number

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this.id = id
    this.customerID = customerId
    this.items = items
    this.total = this.totalOrder()
  }

  totalOrder(): number {
    return this.items.reduce((acc, item) => acc + item.getPrice(), 0)
  }
}