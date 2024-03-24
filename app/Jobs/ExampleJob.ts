import { BaseJob } from '@cavai/adonis-queue'
import Application from '@ioc:Adonis/Core/Application'
import { relative } from 'path'

export default class TestJob extends BaseJob {
  /**
   * Nr of times job is re-tried before it is marked as failed
   */
  // public static retries = 0

  /**
   * Delay for retries in seconds, so other jobs get chance to run
   */
  // public static retryAfter = 5

  /**
   * Filesystem path to job class
   */
  public static classPath = relative(Application.appRoot, __filename)

  /**
   * Jobs accept additional payload that can be typed for easier usage
   */
  constructor (public payload: { name: string, id: number, signup_date: Date }) {
    super()
  }

  /**
   *  Job handler function, write your own code in here
   */
  public async handle () {
    // Code...
  }
}
