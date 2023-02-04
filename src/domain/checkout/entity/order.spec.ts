import Order from './order'
import OrderItem from './order_item'

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const order = new Order('', '123', [])
    }).toThrowError('Id is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('123', '', [])
    }).toThrowError('Customer is required')
  })

  it('should throw error when items is empty', () => {
    expect(() => {
      const order = new Order('123', '321', [])
    }).toThrowError('Items quantity must be greater than 0')
  })

  it('should calculate total', () => {
    const item1 = new OrderItem('1', 'Maçã', 5, '3333', 6)
    const item2 = new OrderItem('1', 'Banana', 3, '2222', 3)
    const order = new Order('1', '234', [item1, item2])
    const total = order.totalOrder()
    expect(total).toBe(39)
  })

  it('should check if the quantity of orderItem is greater than zero', () => {
    expect(() => {
      const item1 = new OrderItem('1', 'Maçã', 5, '3333', 0)
      const item2 = new OrderItem('1', 'Banana', 3, '2222', 3)
      const order = new Order('1', '234', [item1, item2])
    }).toThrowError('Quantity must be greater than zero')
  })
})
