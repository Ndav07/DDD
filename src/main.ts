import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Nkollas")
const address = new Address("Rua um", 1, "63195-000", "Altaneira")

customer.changeAddress(address)

const item1 = new OrderItem("1", "Item1", 10)
const item2 = new OrderItem("2", "Item2", 15)

const order = new Order("1", "123", [item1, item2])
