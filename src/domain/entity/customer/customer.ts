import Address from '../address/address'

export default class Customer {
  private id: string
  private name: string
  private address!: Address
  private activity: boolean = true
  private rewardPoints: number = 0

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.validate()
  }

  validate(): void {
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

  getAddress(): Address {
    return this.address
  }

  isActive(): boolean {
    return this.activity
  }

  changeName(name: string): void {
    this.name = name
    this.validate()
  }

  changeAddress(address: Address) {
    this.address = address
  }

  addPoints(points: number): void {
    this.rewardPoints += points
  }

  activate(): void {
    if (this.address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this.activity = true
  }

  deactivate(): void {
    this.activity = false
  }
}
