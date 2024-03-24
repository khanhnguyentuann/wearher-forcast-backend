import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/favorite',  'FavoritesController.saveFavorite').middleware(['auth', 'authUser'])
  Route.get('/favorites',  'FavoritesController.getFavorites').middleware(['auth', 'authUser'])
}).prefix('/api/v1')
