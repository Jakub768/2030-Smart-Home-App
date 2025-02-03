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

curWeather = getWeatherData("Edinburgh", "05f9f314f71d9d69f947eeffac9a4a1d")

print(getTemperature(curWeather))
