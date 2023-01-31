import Address from "./address"
import Customer from "./customer"

describe("Customer unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "Nikollas")
    }).toThrowError("Id is required")
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("1233", "")
    }).toThrowError("Name is required")
  })

  it("should change name", () => {
    const customer = new Customer("123", "Nikollas")
    customer.changeName("David")
    expect(customer.getName()).toBe("David")
  })

  it("should change name and throw error when name is empty", () => {
    const customer = new Customer("123", "Nikollas")
    expect(() => {
      customer.changeName("")
    }).toThrowError("Name is required")
  })

  it("should activate customer", () => {
    const customer = new Customer("123", "Nikollas")
    const address = new Address("Rua Padre Luiz", 321, "63456-000", "Altitune")
    customer.changeAddress(address)
    customer.activate()
    expect(customer.isActive()).toBe(true)
  })

  it("should deactivate customer", () => {
    const customer = new Customer("123", "Nikollas")
    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })

  it("should throw error when activate customer without address", () => {
    const customer = new Customer("123", "Nikollas")

    expect(() => {
      customer.activate()
    }).toThrowError("Address is mandatory to activate a customer")
  })

})
