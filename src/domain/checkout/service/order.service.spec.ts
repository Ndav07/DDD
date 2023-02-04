import Customer from '../../customer/entity/customer'
import Order from '../entity/order'
import OrderItem from '../entity/order_item'
import OrderService from './order.service'

describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('c1', 'Nikollas')
    const item1 = new OrderItem('1', 'Maçã', 5, '3333', 6)
    const item2 = new OrderItem('2', 'Banana', 3, '2222', 3)

    const order = OrderService.placeOrder(customer, [item1, item2])

    expect(customer.getRewardPoints()).toBe(19.5)
    expect(order.totalOrder()).toBe(39)
  })

  it('should get total of all orders', () => {
    const item1 = new OrderItem('1', 'Maçã', 5, '3333', 6)
    const item2 = new OrderItem('2', 'Banana', 3, '2222', 3)
    const order1 = new Order('1', '234', [item1, item2])
    const item3 = new OrderItem('3', 'Mamão', 3, '4444', 2)
    const item4 = new OrderItem('4', 'Uva', 2, '5555', 20)
    const order2 = new Order('1', '234', [item1, item2, item3, item4])

    const total = OrderService.totalPriceOrders([order1, order2])
    expect(total).toBe(124)
  })
})
