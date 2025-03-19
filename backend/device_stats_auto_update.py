import database_execute
import datetime
import device_stats_update_database
import time
import threading

# Locks
cache_lock = threading.Lock()
update_lock = threading.Lock()
device_status_lock = threading.Lock()
db_lock = threading.Lock()

# Global Tracking Variables
initial_dictionary_for_device_status = {}
recently_updated_device = {}
last_updated_time = datetime.datetime.now()

schedule_update_time = (0, 0, 10, 0)  # (days, hours, minutes, seconds)
schedule_update_time_in_seconds = (
    schedule_update_time[0] * 86400 +
    schedule_update_time[1] * 3600 +
    schedule_update_time[2] * 60 +
    schedule_update_time[3]
)

print(f"Scheduled device statistic update time: {schedule_update_time[0]} days {schedule_update_time[1]} hours {schedule_update_time[2]} minutes {schedule_update_time[3]} seconds.")

# Function to fetch device IDs
def get_device_id_list():
    with db_lock:
        device_ids = database_execute.execute_SQL("SELECT deviceID FROM Devices ORDER BY deviceID")
        return [row[0] for row in device_ids]

# Function to fetch device type
def get_device_type(device_id):
    with db_lock:
        result = database_execute.execute_SQL("SELECT deviceType FROM Devices WHERE deviceID = %s", (device_id,))
        return result[0][0] if result else None

# Function to fetch device status
def get_device_status(device_id):
    with db_lock:
        result = database_execute.execute_SQL("SELECT deviceStatus FROM Devices WHERE deviceID = %s", (device_id,))
        return result[0][0] if result else None

# Fetch the latest device usage and timestamp
def get_latest_device_usage_and_timestamp(device_id):
    with db_lock:
        return database_execute.execute_SQL("""
            SELECT deviceUsage, timestamp 
            FROM DeviceStats 
            WHERE deviceID = %s 
            ORDER BY timestamp DESC 
            LIMIT 1
        """, (device_id,))

# Fetch device ID, type, and status (optimized for batch queries)
def get_device_ID_and_type_and_status():
    with db_lock:
        return database_execute.execute_SQL("SELECT deviceID, deviceType, deviceStatus FROM Devices")

# Fetch device usage
def get_device_usage(device_id):
    with db_lock:
        result = database_execute.execute_SQL("""
            SELECT deviceUsage 
            FROM DeviceStats 
            WHERE deviceID = %s 
            ORDER BY timestamp DESC 
            LIMIT 1
        """, (device_id,))
        return result[0][0] if result else 0

# Routine update function
def routine_update():
    """ Updates device stats. """
    device_id_list = get_device_id_list()
    current_time = datetime.datetime.now()

    for device_id in device_id_list:
        # Fetch data BEFORE acquiring the lock
        device_status = get_device_status(device_id)
        device_type = get_device_type(device_id)
        usage_data = get_latest_device_usage_and_timestamp(device_id)

        # Ensure valid data
        if not usage_data or len(usage_data[0]) < 2:
            last_usage, last_timestamp = 0, current_time
        else:
            last_usage, last_timestamp = usage_data[0]

        # Compute new usage if active
        if device_status == "active":
            time_difference = current_time - last_timestamp
            new_device_usage = last_usage + time_difference.total_seconds()
        else:
            new_device_usage = 0

        # Update the database safely
        device_stats_update_database.update_device_stats(device_id, device_type, new_device_usage, device_status)
        print("Device Stat Updated")

# Routine update helper (thread-safe)
def routine_update_helper():
    """ Periodically calls routine_update(). """
    global last_updated_time

    while True:
        current_time = datetime.datetime.now()
        
        with update_lock:  # Lock before modifying last_updated_time
            if current_time - last_updated_time >= datetime.timedelta(seconds=schedule_update_time_in_seconds):
                routine_update()
                last_updated_time = current_time
        
        time.sleep(1)

# Monitor state changes in device status
def monitor_state_changes():
    while True:
        for device_id, device_type, device_status in get_device_ID_and_type_and_status():
            with device_status_lock:  # Lock before modifying shared state
                previous_status = initial_dictionary_for_device_status.get(device_id)

                if previous_status is None:
                    initial_dictionary_for_device_status[device_id] = device_status
                elif previous_status != device_status:
                    with cache_lock:  # Nested lock
                        if device_status == "active":
                            device_stats_update_database.update_device_stats(device_id, device_type, 0, device_status)
                            recently_updated_device[device_id] = datetime.datetime.now().timestamp()
                        elif device_status == "inactive":
                            new_device_status = "conclusion"
                            device_usage = get_device_usage(device_id)
                            device_stats_update_database.update_device_stats(device_id, device_type, device_usage, new_device_status)
                        elif device_status == "conclusion":
                            device_stats_update_database.update_device_stats(device_id, device_type, 0, "inactive")

                        initial_dictionary_for_device_status[device_id] = device_status
            print("Device Status Updated")
        time.sleep(1)

# Clear cache periodically
def clear_cache():
    """ Clears recently_updated_device cache every 10 seconds. """
    while True:
        with cache_lock:
            recently_updated_device.clear()
        time.sleep(10)