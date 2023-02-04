import Order from '../../../../domain/checkout/entity/order'
import OrderItem from '../../../../domain/checkout/entity/order_item'
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order.repository.interface'
import OrderItemModel from './order-item.model'
import OrderModel from './order.model'


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.getId(),
        customer_id: entity.getCustomerId(),
        total: entity.totalOrder(),
        items: entity.getItems().map((item) => ({
          id: item.getId(),
          name: item.getName(),
          price: item.getPrice(),
          product_id: item.getProductId(),
          quantity: item.getQuantity(),
        })),
      },
      { include: [{ model: OrderItemModel }] }
    )
  }

  async update(entity: Order): Promise<void> {
    throw new Error('Not implements, does not make sense')
  }

  async find(id: string): Promise<Order> {
    let orderModel
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: ['items'],
      })
    } catch (error) {
      throw new Error('Order not found')
    }
    const items = orderModel.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      )
    })
    const order = new Order(orderModel.id, orderModel.customer_id, items)
    return order
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: { model: OrderItemModel },
    })
    const orders = orderModels.map((orderModel) => {
      const items = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
      })
      const order = new Order(orderModel.id, orderModel.customer_id, items)
      return order
    })
    return orders
  }
}
