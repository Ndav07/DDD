import Customer from '../../entity/customer/customer'
import Order from '../../entity/order/order'
import OrderItem from '../../entity/order/order_item'
import {v4 as uuid} from 'uuid'

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
