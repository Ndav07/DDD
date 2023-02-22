import Validatorinterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from 'yup'

export default class CustomerYupValidator implements Validatorinterface<Customer> {
  validate(entity: Customer): void {
    try {
      yup.object().shape({
        id: yup.string().required('Id is required'),
        name: yup.string().required('Name is required')
      }).validateSync({
        id: entity.getId(),
        name: entity.getName()
      }, 
      {
        abortEarly: false
      })
    } catch (errors) {
      const errs = errors as yup.ValidationError
      errs.errors.forEach((error) => {
        entity.notifyError({
          context: 'customer',
          message: error
        })
      })
    }
  }
}