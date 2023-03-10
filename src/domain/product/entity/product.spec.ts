import Product from './product'

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'Produc 1', 100)
    }).toThrowError('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new Product('12', '', 100)
    }).toThrowError('Name is required')
  })

  it('should throw error when price is equal than zero', () => {
    expect(() => {
      const product = new Product('12', 'Product1', 0)
    }).toThrowError('Price must be greater than zero')
  })

  it('should throw error when price is less than zero', () => {
    expect(() => {
      const product = new Product('12', 'Product1', -1)
    }).toThrowError('Price must be greater than zero')
  })

  it('should change name', () => {
    const product = new Product('12', 'Product1', 14)
    product.changeName('Product2')
    expect(product.getName()).toBe('Product2')
  })

  it('should change price', () => {
    const product = new Product('12', 'Product1', 14)
    product.changePrice(34)
    expect(product.getPrice()).toBe(34)
  })
})
