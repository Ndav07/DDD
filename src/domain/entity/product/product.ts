export default class Product {
  private id: string
  private name: string
  private price: number

  constructor(id: string, name: string, price: number) {
    this.id = id
    this.name = name
    this.price = price
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
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getPrice(): number {
    return this.price
  }

  changeName(name: string): void {
    this.name = name
  }

  changePrice(price: number): void {
    this.price = price
  }
}