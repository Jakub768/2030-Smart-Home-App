import requests

def getWeatherData(cityName, APIKey):
    URL = f"http://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={APIKey}"
    return requests.get(URL)

curWWeather = getWeatherData("Edinburgh", "05f9f314f71d9d69f947eeffac9a4a1d")

print(curWWeather.json())
