import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Favorite from "App/Models/Favorite";
import Database from "@ioc:Adonis/Lucid/Database";
import { StatusCodes } from "http-status-codes";

export default class FavoritesController {
  public async saveFavorite({ request, response, user }: HttpContextContract) {
    const weatherType = request.input("weather_type");
    const region = request.input("region");

    if (!weatherType || !region) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        message: "Weather type and region are required.",
      });
    }

    let favorite;

    await Database.transaction(async (trx) => {
      favorite = new Favorite();
      favorite.userId = user.id;
      favorite.weatherType = weatherType;
      favorite.region = region;

      await favorite.useTransaction(trx).save();
    });

    return response.status(StatusCodes.OK).send({
      message: "Favorite saved successfully.",
      favorite: {
        id: favorite.id,
        userId: favorite.userId,
        weatherType: favorite.weatherType,
        region: favorite.region,
      },
    });
  }

  public async getFavorites({ response, user }: HttpContextContract) {
    const favorites = await Favorite.query()
      .where('user_id', user.id)
      .select('weather_type', 'region');

    const favoritesList = favorites.map(fav => ({
      weatherType: fav.weatherType,
      region: fav.region,
    }));

    return response.status(StatusCodes.OK).send({
      favorites: favoritesList
    });
  }
}
