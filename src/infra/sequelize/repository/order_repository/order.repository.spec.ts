import { Sequelize } from 'sequelize-typescript'
import Address from '../../../../domain/entity/address/address'
import Customer from '../../../../domain/entity/customer/customer'
import Order from '../../../../domain/entity/order/order'
import OrderItem from '../../../../domain/entity/order/order_item'
import Product from '../../../../domain/entity/product/product'
import CustomerModel from '../../db/model/customer/customer.model'
import OrderItemModel from '../../db/model/order/order-item.model'
import OrderModel from '../../db/model/order/order.model'
import ProductModel from '../../db/model/product/product.model'
import CustomerRepository from '../customer_repository/customer.repository'
import ProductRepository from '../product_repository/product.repository'
import OrderRepository from './order.repository'

describe('Product repository tests', () => {
  let sequileze: Sequelize

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequileze.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel])
    await sequileze.sync()
  })

  afterEach(async () => {
    await sequileze.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'Customer1')
    const address1 = new Address('Street1', 1, 'Zipcode1', 'City1')
    customer.changeAddress(address1)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product1 = new Product('1', 'Product1', 100)
    await productRepository.create(product1)
    const product2 = new Product('2', 'Product2', 200)
    await productRepository.create(product2)

    const ordemItem1 = new OrderItem('1', product1.getName(), product1.getPrice(), product1.getId(), 2)
    const ordemItem2 = new OrderItem('2', product2.getName(), product2.getPrice(), product2.getId(), 4)

    const orderRepository = new OrderRepository()
    const order = new Order('1', customer.getId(), [ordemItem1, ordemItem2])
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({ where: { id: order.getId() }, include: ['items'] })

    expect(orderModel?.toJSON()).toStrictEqual({
      id: '1',
      customer_id: '1',
      total: order.totalOrder(),
      items: [
        {
          id: ordemItem1.getId(),
          name: ordemItem1.getName(),
          price: ordemItem1.getPrice(),
          quantity: ordemItem1.getQuantity(),
          product_id: ordemItem1.getProductId(),
          order_id: '1'
        },
        {
          id: ordemItem2.getId(),
          name: ordemItem2.getName(),
          price: ordemItem2.getPrice(),
          quantity: ordemItem2.getQuantity(),
          product_id: ordemItem2.getProductId(),
          order_id: '1'
        }
      ]
    })

  })
  
})