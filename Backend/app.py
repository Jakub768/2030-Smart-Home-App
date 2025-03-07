from flask import Flask, jsonify
import database.execute_DB as execute_DB

app = Flask(__name__)

@app.route('/api/home', methods=['GET'])
def get_home():
    house_id = 2

    query_active_devices = """
        SELECT COUNT(*) 
        FROM Devices
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Devices.status = 'active' AND Rooms.houseID = %s;
    """
    active_devices = execute_DB.execute_SQL(query_active_devices, (house_id,))
    active_devices_count = active_devices[0][0] if active_devices and active_devices[0] else 0

    query_occupied_rooms = """
        SELECT COUNT(*) 
        FROM Rooms
        WHERE Occupied = 'occupied' AND houseID = %s;
    """
    occupied_rooms = execute_DB.execute_SQL(query_occupied_rooms, (house_id,))
    occupied_rooms_count = occupied_rooms[0][0] if occupied_rooms and occupied_rooms[0] else 0

    query_energy_cost = """
        SELECT SUM(Stats.costsOfEnergy) 
        FROM Stats
        JOIN Devices ON Stats.deviceID = Devices.deviceID
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Rooms.houseID = %s;
    """
    energy_cost = execute_DB.execute_SQL(query_energy_cost, (house_id,))
    energy_cost_total = energy_cost[0][0] if energy_cost and energy_cost[0][0] is not None else 0

    query_latest_weather = """
        SELECT weatherType, temperature, humidity, windSpeed
        FROM Weather
        WHERE houseID = %s
        ORDER BY timestamp DESC
        LIMIT 1;
    """
    latest_weather = execute_DB.execute_SQL(query_latest_weather, (house_id,))

    if latest_weather and latest_weather[0]:
        weather_type, temperature, humidity, wind_speed = latest_weather[0]
    else:
        weather_type, temperature, humidity, wind_speed = "Unknown", None, None, None

    response_data = {
        "active_devices": active_devices_count,
        "occupied_rooms": occupied_rooms_count,
        "total_energy_cost": energy_cost_total,
        "weather": {
            "type": weather_type,
            "temperature": temperature,
            "humidity": humidity,
            "wind_speed": wind_speed
        }
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
