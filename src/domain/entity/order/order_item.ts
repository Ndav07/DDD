export default class OrderItem {
  private id: string
  private productId: string
  private name: string
  private price: number
  private quantity: number

  constructor(id: string, name: string, price: number, productId: string, quantity: number) {
    this.id = id
    this.name = name
    this.price = price
    this.productId = productId
    this.quantity = quantity
    this.validate()
  }

  validate(): void {
    if(this.id.length === 0) {
      throw new Error("Id is required")
    }
    if(this.name.length === 0) {
      throw new Error("Name is required")
    }
    if(this.price <= 0) {
      throw new Error("Price must be greater than zero")
    }
    if(this.productId.length === 0) {
      throw new Error("Product is required")
    }
    if(this.quantity <= 0) {
      throw new Error("Quantity must be greater than zero")
    }
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getPrice(): number {
    return this.price * this.quantity
  }

  getProductId(): string {
    return this.productId
  }

  getQuantity(): number {
    return this.quantity
  }
}