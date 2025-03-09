from flask import Flask, jsonify, request, session
from flask_session import Session
import functions.database_execute, functions.permissions_management, functions.device_management, bcrypt
from datetime import timedelta

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)
Session(app)

# User Authentication Functions
# -----------------------------

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not all([username, password]):
        return jsonify({"error": "username and password are required"}), 400

    user = functions.database_execute.execute_SQL("""
        SELECT userID, password FROM Users WHERE username = %s
    """, (username,))

    if user:
        stored_hashed_password = user[0][1].encode('utf-8')

        # Securely compare hashed passwords
        if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password):
            session['user_id'] = user[0][0]
            session.permanent = True
            return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "Invalid username or password"}), 401

# Route for user logout
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logout successful"}), 200

# User Management Functions
# -------------------------

# Function to get all users
def get_all_users():
    query = """
        SELECT userID, username, eMailAddress, firstName, lastName, roles
        FROM Users;
    """
    result = functions.database_execute.execute_SQL(query)
    return result if result else []

# Route to get all users
@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = get_all_users()
        return jsonify({"users": users}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to update the role of a user
@app.route('/update_user_role', methods=['POST'])
def update_user_role():
    data = request.get_json()

    user_id = data.get('user_id')
    new_role = data.get('new_role')
    requester_id = data.get('requester_id')

    if not all([user_id, new_role, requester_id]):
        return jsonify({"error": "user_id, new_role, and requester_id are required"}), 400

    try:
        # Check if the requester has permission to update the user role
        if not functions.permissions_management.has_permission(requester_id, user_id):
            return jsonify({"error": "Requester does not have permission to update this user"}), 403

        # Update the user role
        rows_affected = functions.permissions_management.set_role(user_id, new_role)

        if rows_affected:
            return jsonify({"message": "User role updated successfully"}), 200
        else:
            return jsonify({"error": "Failed to update user role"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Home and Dashboard Data Functions
# ---------------------------------

# Function to get the count of active devices in a house
def get_active_devices_count(house_id):
    query = """
        SELECT COUNT(*) 
        FROM Devices
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Devices.deviceStatus = 'active' AND Rooms.houseID = %s;
    """
    result = functions.database_execute.execute_SQL(query, (house_id,))
    return result[0][0] if result else 0

# Function to get the count of occupied rooms in a house
def get_occupied_rooms_count(house_id):
    query = """
        SELECT COUNT(*) 
        FROM Rooms
        WHERE occupation = 'Occupied' AND houseID = %s;
    """
    result = functions.database_execute.execute_SQL(query, (house_id,))
    return result[0][0] if result else 0

# Function to get the last payment date for a house
def get_last_payment_date(house_id):
    query = """
        SELECT timestamp FROM BillStats WHERE houseID = %s ORDER BY timestamp DESC LIMIT 1;
    """
    result = functions.database_execute.execute_SQL(query, (house_id,))
    return result[0][0] if result else None

# Function to get the total energy cost since the last payment date for a house
def get_energy_cost_total(house_id, last_payment_date):
    query = """
        SELECT SUM(DeviceStats.costsOfEnergy) 
        FROM DeviceStats
        JOIN Devices ON DeviceStats.deviceID = Devices.deviceID
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Rooms.houseID = %s AND DeviceStats.timestamp > %s;
    """
    result = functions.database_execute.execute_SQL(query, (house_id, last_payment_date))
    return result[0][0] if result and result[0][0] is not None else 0

# Function to get the latest weather information for a house
def get_latest_weather(house_id):
    query = """
        SELECT weatherType, temperature, humidity, windSpeed
        FROM Weather
        WHERE houseID = %s
        ORDER BY timestamp DESC
        LIMIT 1;
    """
    result = functions.database_execute.execute_SQL(query, (house_id,))
    return result[0] if result else ("Unknown", None, None, None)

# Function to get the bill status for a house
def get_bill_status(house_id):
    query = """
        SELECT amount, paidStatus, timestamp, nextBillDue
        FROM BillStats
        WHERE houseID = %s
        ORDER BY timestamp DESC
        LIMIT 1;
    """
    result = functions.database_execute.execute_SQL(query, (house_id,))
    if result:
        amount, paid_status, timestamp, next_due_date = result[0]
        paid_status = "Paid" if paid_status == 1 else "Unpaid"
        return amount, paid_status, timestamp, next_due_date
    return None, None, None, None

# Function to get the energy consumption in the last 24 hours for a house
def get_last_24_hours_energy_consumption(house_id):
    query = """
        SELECT SUM(DeviceStats.energyConsumption)
        FROM DeviceStats
        JOIN Devices ON DeviceStats.deviceID = Devices.deviceID
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Rooms.houseID = %s AND DeviceStats.timestamp > DATE_SUB(NOW(), INTERVAL 24 HOUR);
    """
    result = functions.database_execute.execute_SQL(query, (house_id,))
    return result[0][0] if result and result[0][0] is not None else 0

# Function to get the energy cost in the last 24 hours for a house
def get_last_24_hours_energy_cost(house_id):
    query = """
        SELECT SUM(DeviceStats.costsOfEnergy)
        FROM DeviceStats
        JOIN Devices ON DeviceStats.deviceID = Devices.deviceID
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Rooms.houseID = %s AND DeviceStats.timestamp > DATE_SUB(NOW(), INTERVAL 24 HOUR);
    """
    result = functions.database_execute.execute_SQL(query, (house_id,))
    return result[0][0] if result and result[0][0] is not None else 0

# Function to get the top 3 most used devices in the last 24 hours for a house
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
    result = functions.database_execute.execute_SQL(query, (houseID,))
    return result

# Function to get the energy consumption by interval for a house
def get_energy_consumption_by_interval(house_id, start_hour, end_hour):
    query = """
        SELECT SUM(DeviceStats.energyConsumption)
        FROM DeviceStats
        JOIN Devices ON DeviceStats.deviceID = Devices.deviceID
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Rooms.houseID = %s AND DeviceStats.timestamp BETWEEN DATE_SUB(NOW(), INTERVAL 1 DAY) + INTERVAL %s HOUR AND DATE_SUB(NOW(), INTERVAL 1 DAY) + INTERVAL %s HOUR;
    """
    result = functions.database_execute.execute_SQL(query, (house_id, start_hour, end_hour))
    return result[0][0] if result and result[0][0] is not None else 0

# Route to get home data
@app.route('/home', methods=['GET'])
def get_home():
    house_id = request.args.get('house_id')

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

# Route to get dashboard data
@app.route('/dashboard', methods=['GET'])
def get_dashboard():
    house_id = request.args.get('house_id')

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

# Device Management Functions
# ---------------------------

# Function to get all devices for a house
def get_all_devices(house_id):
    query = """
        SELECT Devices.deviceID, Devices.deviceName, Devices.deviceType, Devices.deviceStatus, Devices.energyConsumption, Devices.energyGeneration, Devices.deviceUsage
        FROM Devices
        JOIN Rooms ON Devices.roomID = Rooms.roomID
        WHERE Rooms.houseID = %s;
    """
    result = functions.database_execute.execute_SQL(query, (house_id,))
    return result if result else []

# Route to get all devices for a house
@app.route('/devices', methods=['GET'])
def get_devices():
    house_id = request.args.get('house_id')

    if not house_id:
        return jsonify({"error": "house_id is required"}), 400

    try:
        devices = get_all_devices(house_id)
        return jsonify({"devices": devices}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to add a new device
@app.route('/add_device', methods=['POST'])
def add_device():
    data = request.get_json()

    device_name = data.get('device_name')
    device_type = data.get('device_type')
    room_id = data.get('room_id')
    user_id = data.get('user_id')
    energy_consumption = data.get('energy_consumption')
    energy_generation = data.get('energy_generation')

    if not all([device_name, device_type, room_id, user_id, energy_consumption, energy_generation]):
        return jsonify({"error": "All fields are required"}), 400

    try:
        params = (device_name, device_type, room_id, user_id, energy_consumption, energy_generation, 'inactive', 0)
        rows_affected = functions.device_management.add_device(params)

        if rows_affected:
            return jsonify({"message": "Device added successfully"}), 201
        else:
            return jsonify({"error": "Failed to add device"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/remove_device', methods=['POST'])
def remove_device():
    data = request.get_json()

    device_ID = data.get('device_ID')

    if not device_ID:
        return jsonify({"error": "Device not found"}), 400

    try:
        rows_affected = functions.device_management.remove_device(device_ID)

        if rows_affected:
            return jsonify({"message": "Device removed successfully"}), 201
        else:
            return jsonify({"error": "Failed to remove device"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/change_name', methods=['POST'])
def change_device_name():
    data = request.get_json()

    device_ID = data.get('device_ID')
    new_device_name = data.get('new_device_name')

    if not device_ID or not new_device_name:
        return jsonify({"error": "Device ID and new device name are required"}), 400

    try:
        rows_affected = functions.device_management.change_name(device_ID, new_device_name)

        if rows_affected:
            return jsonify({"message": "Device name changed successfully"}), 200
        else:
            return jsonify({"error": "Failed to change device name"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to update the status of a device
@app.route('/update_device_status', methods=['POST'])
def update_device_status():
    data = request.get_json()
    device_id = data.get('device_id')

    if not device_id:
        return jsonify({"error": "device_id is required"}), 400

    try:
        query = "SELECT deviceStatus FROM Devices WHERE deviceID = %s"
        result = functions.database_execute.execute_SQL(query, (device_id,))

        if not result:
            return jsonify({"error": "Device not found"}), 404

        current_status = result[0][0]
        new_status = "active" if current_status == "inactive" else "inactive"

        if new_status == "active":
            rows_affected = functions.device_management.device_activate(device_id)
        else:
            rows_affected = functions.device_management.device_deactivate(device_id)

        if rows_affected:
            return jsonify({"message": f"Device status updated to {new_status}"}), 200
        else:
            return jsonify({"error": "Failed to update device status"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5000)