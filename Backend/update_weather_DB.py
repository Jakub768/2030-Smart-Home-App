import datetime, weather_API, execute_DB

def update_weather(houseId):
    city = execute_DB.execute_SQL("SELECT city FROM House WHERE houseID = %s", (houseId,))
    if not city: return f"Error: No city found for houseID {houseId}"

    weather = weather_API.getWeatherData(city[0][0])
    if not weather: return "Error: Failed to fetch weather data."

    data = (
        weather_API.getTemperature(weather),
        weather_API.getHumidity(weather),
        weather_API.getWind(weather),
        weather_API.getDescription(weather),
        datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        houseId
    )
    
    return execute_DB.execute_SQL(
        "INSERT INTO Weather (temperature, humidity, windSpeed, weatherType, timestamp, houseID) VALUES (%s, %s, %s, %s, %s, %s)",
        data
    )
