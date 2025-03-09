import datetime
import functions.weather_API
import functions.database_execute

def update_weather(houseId):
    # Fetch the city for the given houseID
    city_result = functions.database_execute.execute_SQL("SELECT city FROM House WHERE houseID = %s", (houseId,))
    if not city_result:
        return f"Error: No city found for houseID {houseId}"

    city = city_result[0][0]

    # Fetch the weather data for the city
    weather = functions.weather_API.getWeatherData(city)
    if not weather:
        return "Error: Failed to fetch weather data."

    # Prepare the data for insertion
    data = (
        functions.weather_API.getTemperature(weather),
        functions.weather_API.getHumidity(weather),
        functions.weather_API.getWind(weather),
        functions.weather_API.getDescription(weather),
        datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        houseId
    )

    # Insert the weather data into the database
    return functions.database_execute.execute_SQL(
        "INSERT INTO Weather (temperature, humidity, windSpeed, weatherType, timestamp, houseID) VALUES (%s, %s, %s, %s, %s, %s)",
        data
    )