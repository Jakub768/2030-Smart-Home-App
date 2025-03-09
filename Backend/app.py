from flask import Flask, jsonify, request
import functions.database_execute as database_execute
#import functions.device_stats_auto_update, functions.weather_auto_update, functions_bill_stats_auto_update

app = Flask(__name__)

@app.route('/api/home', methods=['GET'])
def get_home():
    house_id = 1 #request.args.get('house_id')

    if not house_id:
        return jsonify({"error": "house_id is required"}), 400

    try:
        query_active_devices = """
            SELECT COUNT(*) 
            FROM Devices
            JOIN Rooms ON Devices.roomID = Rooms.roomID
            WHERE Devices.status = 'active' AND Rooms.houseID = %s;
        """
        active_devices = database_execute.execute_SQL(query_active_devices, (house_id,))
        active_devices_count = active_devices[0][0] if active_devices else 0

        query_occupied_rooms = """
            SELECT COUNT(*) 
            FROM Rooms
            WHERE Occupied = 'occupied' AND houseID = %s;
        """
        occupied_rooms = database_execute.execute_SQL(query_occupied_rooms, (house_id,))
        occupied_rooms_count = occupied_rooms[0][0] if occupied_rooms else 0

        last_payment_date = database_execute.execute_SQL("""
            SELECT timestamp FROM BillStats WHERE houseID = %s ORDER BY timestamp DESC LIMIT 1  
        """, (house_id,))

        last_payment_date = last_payment_date[0][0] if last_payment_date else None

        query_energy_cost = """
            SELECT SUM(DeviceStats.costsOfEnergy) 
            FROM DeviceStats
            JOIN Devices ON DeviceStats.deviceID = Devices.deviceID
            JOIN Rooms ON Devices.roomID = Rooms.roomID
            WHERE Rooms.houseID = %s
            AND DeviceStats.timestamp > %s;
        """
        energy_cost = database_execute.execute_SQL(query_energy_cost, (house_id, last_payment_date))
        energy_cost_total = energy_cost[0][0] if energy_cost and energy_cost[0][0] is not None else 0

        query_latest_weather = """
            SELECT weatherType, temperature, humidity, windSpeed
            FROM Weather
            WHERE houseID = %s
            ORDER BY timestamp DESC
            LIMIT 1;
        """
        latest_weather = database_execute.execute_SQL(query_latest_weather, (house_id,))

        weather_data = latest_weather[0] if latest_weather else ("Unknown", None, None, None)
        weather_type, temperature, humidity, wind_speed = weather_data

        query_bill_status = """
            SELECT amount, paidStatus, timestamp, nextBillDue
            FROM BillStats
            WHERE houseID = %s
            ORDER BY timestamp DESC
            LIMIT 1;
        """
        bill_status = database_execute.execute_SQL(query_bill_status, (house_id,))

        if bill_status:
            past_bill_amount = bill_status[0][0]
            paid_status = "Paid" if bill_status[0][1] == 1 else "Unpaid"
            timestamp = bill_status[0][2]
            next_due_date = bill_status[0][3]
        else:
            paid_status, past_bill_amount, next_due_date, current_amount, timestamp = (None, None, None, None, None)

        current_amount = energy_cost_total

        response_data = {
            "Devices_Active": active_devices_count,
            "Rooms_Occupied": occupied_rooms_count,
            "Weather_Description": weather_type,
            "Temperature": temperature,
            "Humidity": humidity,
            "Wind_Speed": wind_speed,
            "Bill_Paid_Status": paid_status,
            "Past_Bill_Amount": past_bill_amount,
            "Last_Paid_Date": timestamp,
            "Next_Due_Date": next_due_date,
            "Current_Amount": current_amount
        }

        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)