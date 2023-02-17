import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customers')
      .send({
        name: 'Níkollas',
        address: {
          street: 'Street',
          city: 'City',
          number: 133,
          zip: '1234-00',
        },
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Níkollas')
    expect(response.body.address.street).toBe('Street')
    expect(response.body.address.city).toBe('City')
    expect(response.body.address.number).toBe(133)
    expect(response.body.address.zip).toBe('1234-00')
  })
})
