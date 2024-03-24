import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'

export class RegisterCustomerValidator  {
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    email: schema.string({ trim: true }, [
      rules.regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [
      rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      rules.minLength(8)
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'The username is required.',
    'name.maxLength': 'The username must be no longer than 255 characters.',
    'email.required': 'The email is required.',
    'email.regex': 'The email must be a valid email address.',
    'email.unique': 'This email is already in use.',
    'password.required': 'The password is required',
    'password.minLength': 'The password must be at least 8 characters long.',
    'password.regex': 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
  }
}
