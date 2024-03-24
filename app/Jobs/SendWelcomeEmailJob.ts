import { BaseJob } from '@cavai/adonis-queue'
import Mail from '@ioc:Adonis/Addons/Mail'
import Application from '@ioc:Adonis/Core/Application'
import { relative } from 'path'

export default class SendWelcomeEmailJob extends BaseJob {
  /**
   * Nr of times job is re-tried before it is marked as failed
   */
  public static retries = 3

  /**
   * Delay for retries in seconds, so other jobs get chance to run
   */
  public static retryAfter = 10

  /**
   * Filesystem path to job class
   */
  public static classPath = relative(Application.appRoot, __filename)

  /**
   * Jobs accept additional payload that can be typed for easier usage
   */
  constructor (public payload: { name: string, password: string, email: string }) {
    super()
  }

  /**
   *  Job handler function, write your own code in here
   */
  public async handle () {
    Mail.sendLater((message) => {
      message
        .to(this.payload.email)
        .subject("Your account is ready")
        .htmlView("emails/welcome", {
          fullName: this.payload.name,
          password: this.payload.password,
          email: this.payload.email,
        });
    });
  }
}
