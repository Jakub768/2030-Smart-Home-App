import weather_auto_update, bill_stats_auto_update, device_stats_auto_update
import threading
import time
import datetime
import database_execute
import random

schedule_update_time = (0, 0, 5, 0)
print(f"Scheduled weather update time: {schedule_update_time[0]} days {schedule_update_time[1]} hours {schedule_update_time[2]} minutes {schedule_update_time[3]} seconds, ")
schedule_update_time_in_seconds = (
    schedule_update_time[0] * 24 * 60 * 60 +
    schedule_update_time[1] * 60 * 60 +
    schedule_update_time[2] * 60 +
    schedule_update_time[3]
)


# Status mapping
status = {
    1: 'active',
    2: 'inactive'
}

# Global variable to track last update time
last_updated_time = datetime.datetime.now()

# Get all device IDs from the database
def get_all_devices():
    query = "SELECT deviceID FROM Devices ORDER BY deviceID ASC"
    return database_execute.execute_SQL(query)

# Randomly change device statuses
def random_device_status_change():
    query = "UPDATE Devices SET deviceStatus = %s WHERE deviceID = %s"
    device_list = get_all_devices()
    
    if device_list:
        for device in device_list:
            deviceID = device[0]
            random_num = random.choice([1, 2])
            deviceStatus = status[random_num]
            database_execute.execute_SQL(query, (deviceStatus, deviceID))
    
    print(f"Device statuses updated at {datetime.datetime.now()}")  # Debugging log

# Periodically update device status
def random_device_status_change_helper():
    global last_updated_time  # Use the global last_updated_time variable

    while True:
        current_time = datetime.datetime.now()
        
        if (current_time - last_updated_time).total_seconds() >= schedule_update_time_in_seconds:
            random_device_status_change()
            last_updated_time = current_time  # Properly update global time reference
        
        time.sleep(1)  # Prevent excessive CPU usage

weather_auto_update.routine_update()
bill_stats_auto_update.routine_update()

thread1 = threading.Thread(target=weather_auto_update.routine_update_helper, daemon=True)
thread2 = threading.Thread(target=bill_stats_auto_update.routine_update_helper, daemon=True)
thread3 = threading.Thread(target=device_stats_auto_update.routine_update_helper, daemon=True)
thread4 = threading.Thread(target=device_stats_auto_update.monitor_state_changes, daemon=True)
thread5 = threading.Thread(target=device_stats_auto_update.clear_cache, daemon=True)
thread6 = threading.Thread(target=random_device_status_change_helper, daemon=True)

thread1.start()
thread2.start()
thread3.start()
thread4.start()
thread5.start()
thread6.start()

# Keep the main thread alive
while True:
    time.sleep(1)