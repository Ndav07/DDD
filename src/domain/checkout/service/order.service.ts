import Order from '../../checkout/entity/order'
import OrderItem from '../../checkout/entity/order_item'
import { v4 as uuid } from 'uuid'
import Customer from '../../customer/entity/customer'

export default class OrderService {
  static totalPriceOrders(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.totalOrder(), 0)
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    const order = new Order(uuid(), customer.getId(), items)
    customer.addPoints(order.totalOrder() / 2)
    return order
  }
}
