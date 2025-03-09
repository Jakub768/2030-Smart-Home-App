from flask import Flask, jsonify, request
import functions.database_execute as database_execute
#import functions.device_stats_auto_update, functions.weather_auto_update, functions_bill_stats_auto_update

app = Flask(__name__)

def get_active_devices_count(house_id):
    query = """
        SELECT COUNT(*) 
        FROM Devices
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Devices.deviceStatus = 'active' AND Rooms.houseID = %s;
    """
    result = database_execute.execute_SQL(query, (house_id,))
    return result[0][0] if result else 0

def get_occupied_rooms_count(house_id):
    query = """
        SELECT COUNT(*) 
        FROM Rooms
        WHERE Occupied = 'occupied' AND houseID = %s;
    """
    result = database_execute.execute_SQL(query, (house_id,))
    return result[0][0] if result else 0

def get_last_payment_date(house_id):
    query = """
        SELECT timestamp FROM BillStats WHERE houseID = %s ORDER BY timestamp DESC LIMIT 1;
    """
    result = database_execute.execute_SQL(query, (house_id,))
    return result[0][0] if result else None

def get_energy_cost_total(house_id, last_payment_date):
    query = """
        SELECT SUM(DeviceStats.costsOfEnergy) 
        FROM DeviceStats
        JOIN Devices ON DeviceStats.deviceID = Devices.deviceID
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Rooms.houseID = %s AND DeviceStats.timestamp > %s;
    """
    result = database_execute.execute_SQL(query, (house_id, last_payment_date))
    return result[0][0] if result and result[0][0] is not None else 0

def get_latest_weather(house_id):
    query = """
        SELECT weatherType, temperature, humidity, windSpeed
        FROM Weather
        WHERE houseID = %s
        ORDER BY timestamp DESC
        LIMIT 1;
    """
    result = database_execute.execute_SQL(query, (house_id,))
    return result[0] if result else ("Unknown", None, None, None)

def get_bill_status(house_id):
    query = """
        SELECT amount, paidStatus, timestamp, nextBillDue
        FROM BillStats
        WHERE houseID = %s
        ORDER BY timestamp DESC
        LIMIT 1;
    """
    result = database_execute.execute_SQL(query, (house_id,))
    if result:
        amount, paid_status, timestamp, next_due_date = result[0]
        paid_status = "Paid" if paid_status == 1 else "Unpaid"
        return amount, paid_status, timestamp, next_due_date
    return None, None, None, None

def get_last_24_hours_energy_consumption(house_id):
    query = """
        SELECT SUM(DeviceStats.energyConsumption)
        FROM DeviceStats
        JOIN Devices ON DeviceStats.deviceID = Devices.deviceID
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Rooms.houseID = %s AND DeviceStats.timestamp > DATE_SUB(NOW(), INTERVAL 24 HOUR);
    """
    result = database_execute.execute_SQL(query, (house_id,))
    return result[0][0] if result and result[0][0] is not None else 0

def get_last_24_hours_energy_cost(house_id):
    query = """
        SELECT SUM(DeviceStats.costsOfEnergy)
        FROM DeviceStats
        JOIN Devices ON DeviceStats.deviceID = Devices.deviceID
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Rooms.houseID = %s AND DeviceStats.timestamp > DATE_SUB(NOW(), INTERVAL 24 HOUR);
    """
    result = database_execute.execute_SQL(query, (house_id,))
    return result[0][0] if result and result[0][0] is not None else 0

def get_last_24_hours_top_3_most_used_device(houseID):
    query = """
        SELECT Devices.deviceType, SUM(DeviceStats.energyConsumption) AS energyConsumed
        FROM DeviceStats
        JOIN Devices ON DeviceStats.deviceID = Devices.deviceID
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Rooms.houseID = %s
        AND DeviceStats.timestamp > DATE_SUB(NOW(), INTERVAL 24 HOUR)
        GROUP BY Devices.deviceType
        ORDER BY energyConsumed DESC
        LIMIT 3;
    """
    result = database_execute.execute_SQL(query, (houseID,))
    return result

def get_energy_consumption_by_interval(house_id, start_hour, end_hour):
    query = """
        SELECT SUM(DeviceStats.energyConsumption)
        FROM DeviceStats
        JOIN Devices ON DeviceStats.deviceID = Devices.deviceID
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Rooms.houseID = %s AND DeviceStats.timestamp BETWEEN DATE_SUB(NOW(), INTERVAL 1 DAY) + INTERVAL %s HOUR AND DATE_SUB(NOW(), INTERVAL 1 DAY) + INTERVAL %s HOUR;
    """
    result = database_execute.execute_SQL(query, (house_id, start_hour, end_hour))
    return result[0][0] if result and result[0][0] is not None else 0

@app.route('/home', methods=['GET'])
def get_home():
    house_id = 1#request.args.get('house_id')

    if not house_id:
        return jsonify({"error": "house_id is required"}), 400

    try:
        active_devices_count = get_active_devices_count(house_id)
        occupied_rooms_count = get_occupied_rooms_count(house_id)
        last_payment_date = get_last_payment_date(house_id)
        energy_cost_total = get_energy_cost_total(house_id, last_payment_date)
        weather_type, temperature, humidity, wind_speed = get_latest_weather(house_id)
        past_bill_amount, paid_status, timestamp, next_due_date = get_bill_status(house_id)
        current_amount = energy_cost_total

        inside_the_residence = {
            "Devices_Active": active_devices_count,
            "Rooms_Occupied": occupied_rooms_count
        }

        outside_the_residence = {
            "Weather_Description": weather_type,
            "Temperature": temperature,
            "Humidity": humidity,
            "Wind_Speed": wind_speed
        }

        energy_bill = {
            "Bill_Paid_Status": paid_status,
            "Past_Bill_Amount": past_bill_amount,
            "Last_Paid_Date": timestamp,
            "Next_Due_Date": next_due_date,
            "Current_Amount": current_amount
        }

        response_data = {
            "Inside_The_Residence": inside_the_residence,
            "Outside_The_Residence": outside_the_residence,
            "Energy_Bill": energy_bill
        }

        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/dashboard', methods=['GET'])
def get_dashboard():
    house_id = 1#request.args.get('house_id')

    if not house_id:
        return jsonify({"error": "house_id is required"}), 400

    try:
        energy_consumed = get_last_24_hours_energy_consumption(house_id)
        energy_cost = get_last_24_hours_energy_cost(house_id)

        last_24_hours = {
            "energy_consumed": energy_consumed,
            "energy_cost": energy_cost
        }

        result = get_last_24_hours_top_3_most_used_device(house_id)

        most_energy_used_by = {
            "device_1": result[0][0] if len(result) > 0 else None,
            "device_2": result[1][0] if len(result) > 1 else None,
            "device_3": result[2][0] if len(result) > 2 else None
        }

        consumption = {
            "12am_to_6am": get_energy_consumption_by_interval(house_id, 0, 6),
            "6am_to_12pm": get_energy_consumption_by_interval(house_id, 6, 12),
            "12pm_to_4pm": get_energy_consumption_by_interval(house_id, 12, 16),
            "4pm_to_8pm": get_energy_consumption_by_interval(house_id, 16, 20),
            "8pm_to_12am": get_energy_consumption_by_interval(house_id, 20, 24)
        }

        response_data = {
            "Last_24_Hours": last_24_hours,
            "Most_Energy_Used_By": most_energy_used_by,
            "Consumption": consumption
        }

        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)