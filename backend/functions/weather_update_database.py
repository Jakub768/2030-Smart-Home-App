import datetime, functions.weather_API, functions.database_execute

def update_weather(houseId):
    city = functions.database_execute.execute_SQL("SELECT city FROM House WHERE houseID = %s", (houseId,))
    if not city: return f"Error: No city found for houseID {houseId}"

    weather = functions.weather_API.getWeatherData(city[0][0])
    if not weather: return "Error: Failed to fetch weather data."

    data = (
        functions.weather_API.getTemperature(weather),
        functions.weather_API.getHumidity(weather),
        functions.weather_API.getWind(weather),
        functions.weather_API.getDescription(weather),
        datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        houseId
    )
    
    return functions.database_execute.execute_SQL(
        "INSERT INTO Weather (temperature, humidity, windSpeed, weatherType, timestamp, houseID) VALUES (%s, %s, %s, %s, %s, %s)",
        data
    )
