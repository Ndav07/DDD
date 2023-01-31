import Address from '../address/address'

export default class Customer {
  private id: string
  private name: string
  private address!: Address
  private activity!: boolean
  private rewardPoints: number = 0

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.validate()
  }

  validate() {
    if (this.id.length === 0) {
      throw new Error('Id is required')
    }
    if (this.name.length === 0) {
      throw new Error('Name is required')
    }
  }

  getName(): string {
    return this.name
  }

  getId(): string {
    return this.id
  }

  getRewardPoints(): number {
    return this.rewardPoints
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

  addPoints(points: number) {
    this.rewardPoints += points
  }

  activate() {
    if (this.address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this.activity = true
  }

  deactivate() {
    this.activity = false
  }
}
