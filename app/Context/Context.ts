import User from "App/Models/User";

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    user: User,
  }
}
