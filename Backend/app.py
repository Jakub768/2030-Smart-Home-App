from flask import Flask, jsonify, request
import execute_DB

app = Flask(__name__)

@app.route('/api/weather', methods=['GET'])
def get_weathers():
    get_latest_weather_data = """
    SELECT temperature, humidity, windSpeed, weatherType
    FROM Weather
    WHERE houseID = %s
    ORDER BY timestamp DESC
    LIMIT 1;
    """
    weather_data = execute_DB.execute_SQL(get_latest_weather_data, (1,))
    return jsonify(weather_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)