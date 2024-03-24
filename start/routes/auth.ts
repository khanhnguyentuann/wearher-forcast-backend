import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login',            'AuthController.login')
  Route.post('/reset-password',   'AuthController.resetPassword')
  Route.post('/change-password',  'AuthController.changePassword').middleware('auth')
  Route.get('/profile',           'AuthController.profile').middleware(['auth', 'authUser'])
}).prefix('/api/v1/auth')
