import requests

def getWeatherData(cityName, APIKey):
    URL = f"http://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={APIKey}"
    req = requests.get(URL)

    return req.json()

def getTemperature(weatherData):
    #note: json returns temperature in kelvin, convert into celsius.
    KELVIN_CONSTANT = 273.15
    temperature = weatherData['main']['temp']

    return temperature - KELVIN_CONSTANT

def getDescription(weatherData):
    return weatherData['weather']['description']

def getHumidity(weatherData):
    return f"{weatherData['main']['humidity']}%"

def getWind(weatherData):
    #note: wind returns meters per second so convert to miles per hour
    METERS_PER_SECOND_CONSTANT = 2.236936
    calculateWind = round(weatherData['wind']['speed'] * METERS_PER_SECOND_CONSTANT)

    return f"{calculateWind}mph" 


curWeather = getWeatherData("Edinburgh", "05f9f314f71d9d69f947eeffac9a4a1d")

print(getWind(curWeather))
