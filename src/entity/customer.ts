import Address from "./address"

export default class Customer {
  private id: string
  private name: string
  private address!: Address
  private activity!: boolean

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.validate()
  }
  
  validate() {
    if(this.id.length === 0) {
      throw new Error("Id is required")
    }
    if(this.name.length === 0) {
      throw new Error("Name is required")
    }
  }
  
  getName(): string {
    return this.name
  }

  isActive(): boolean {
    return this.activity
  }

  changeName(name: string) {
    this.name = name
    this.validate()
  }

  changeAddress(address: Address) {
    this.address = address
  }

  activate() {
    if (this.address === undefined) {
      throw new Error("Address is mandatory to activate a customer")
    }
    this.activity = true
  }

  deactivate() {
    this.activity = false
  }
}