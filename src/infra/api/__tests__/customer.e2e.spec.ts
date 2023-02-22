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
      .post('/customer')
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

  it('should not create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Níkollas'
      })

    expect(response.status).toBe(500)
  })

  it('should list all customer', async () => {
    const response1 = await request(app)
      .post('/customer')
      .send({
        name: 'Níkollas',
        address: {
          street: 'Street',
          city: 'City',
          number: 133,
          zip: '1234-00',
        },
      })
    expect(response1.status).toBe(200)
    expect(response1.body.name).toBe('Níkollas')

    const response2 = await request(app)
      .post('/customer')
      .send({
        name: 'Janie',
        address: {
          street: 'Street 2',
          city: 'City 2',
          number: 1343,
          zip: '66453-00',
        },
      })
    expect(response2.status).toBe(200)
    expect(response2.body.name).toBe('Janie')

    const listResponse = await request(app).get('/customer').send()
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)
    const customer1 = listResponse.body.customers[0]
    expect(customer1.name).toBe('Níkollas')
    expect(customer1.address.city).toBe('City')
    const customer2 = listResponse.body.customers[1]
    expect(customer2.name).toBe('Janie')
    expect(customer2.address.city).toBe('City 2')
  })
})
