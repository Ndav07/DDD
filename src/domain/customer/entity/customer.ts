import Entity from '../../@shared/entity/entity.abstract'
import { NotificationErrorProps } from '../../@shared/notification/notificaion'
import NotificationError from '../../@shared/notification/notification.error'
import CustomerValidatorFactory from '../factory/customer.validator.factory'
import Address from './value-object/address'

export default class Customer extends Entity{
  private name: string
  private address!: Address
  private activity: boolean = true
  private rewardPoints: number = 0

  constructor(id: string, name: string) {
    super(id)
    this.name = name
    this.validate()
  }

  validate(): void {
    CustomerValidatorFactory.create().validate(this)
    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  notifyError(error: NotificationErrorProps): void {
    this.notification.addError(error)
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
      this.notifyError({
        context: 'customer',
        message: 'Address is mandatory to activate a customer'
      })
    }
    this.validate()
    this.activity = true
  }

  deactivate(): void {
    this.activity = false
  }
}
