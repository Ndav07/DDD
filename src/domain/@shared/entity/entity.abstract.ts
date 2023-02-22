import Notification from "../notification/notificaion"

export default abstract class Entity {
  protected id: string
  protected notification: Notification

  constructor(id: string) {
    this.id = id
    this.notification = new Notification()
  }
}