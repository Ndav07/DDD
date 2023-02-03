import Order from '../../../../domain/entity/order/order'
import OrderRepositoryInterface from '../../../../domain/repository/order_repository/order.repository.interface'
import OrderItemModel from '../../db/model/order/order-item.model'
import OrderModel from '../../db/model/order/order.model'

export default class OrderRepository {
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
}
