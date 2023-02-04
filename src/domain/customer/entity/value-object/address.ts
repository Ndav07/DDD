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