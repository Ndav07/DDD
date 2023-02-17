export default class Address {
  private street: string
  private number: number
  private zip: string
  private city: string
  
  constructor(street: string, number: number, zip: string, city: string) {
    this.street = street
    this.number = number
    this.zip = zip
    this.city = city
    this.validate()
  }

  validate(): void {
    if (this.street.length === 0) {
      throw new Error('Street is required')
    }
    if (this.number <= 0) {
      throw new Error('Number is required')
    }
    if (this.zip.length === 0) {
      throw new Error('Zip is required')
    }
    if (this.city.length === 0) {
      throw new Error('City is required')
    }
  }

  getStreet(): string {
    return this.street
  }

  getNumber(): number {
    return this.number
  }

  getZip(): string {
    return this.zip
  }

  getCity(): string {
    return this.city
  }
}