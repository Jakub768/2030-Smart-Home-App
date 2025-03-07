import requests

APIKey = "05f9f314f71d9d69f947eeffac9a4a1d"

def getWeatherData(cityName):
    return requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={APIKey}").json()

def getTemperature(weatherData):
    return round(weatherData['main']['temp'] - 273.15)

def getDescription(weatherData):
    return weatherData['weather'][0]['description']

def getHumidity(weatherData):
    return str(weatherData['main']['humidity'])

def getWind(weatherData):
    return str(weatherData['wind']['speed'] * 2.236936)