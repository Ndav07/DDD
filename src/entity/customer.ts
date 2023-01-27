import Address from "./address"

export default class Customer {
  private id: string
  private name: string
  private address!: Address
  private activity: boolean = false

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.validate()
  }

  validate() {
    if(this.name.length === 0) {
      throw new Error("Name is required")
    }
    if(this.id.length === 0) {
      throw new Error("Id is required")
    }
  }

  changeName(name: string) {
    this.name = name
  }

  changeAddress(address: Address) {
    this.address = address
  }

  active() {
    this.activity = true
  }

  deactivate() {
    this.activity = false
  }
}