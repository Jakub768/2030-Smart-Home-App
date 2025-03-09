import functions.database_execute
import functions.device_stats_update_database
import schedule
import time
import threading

def schedule_device_updates():
    # Schedule device stats updates for each device
    devices = functions.database_execute.execute_SQL("SELECT deviceID, deviceType FROM Devices")

    for deviceID, deviceType in devices:
        schedule.every(10).seconds.do(
            functions.device_stats_update_database.update_device_stats, 
            deviceID=deviceID, 
            deviceType=deviceType
        )

def monitor_device_status():
    # Monitor device status changes and update stats accordingly
    previous_status = {}
    while True:
        devices = functions.database_execute.execute_SQL("SELECT deviceID, deviceStatus, deviceType FROM Devices")
        for deviceID, deviceStatus, deviceType in devices:
            if deviceID not in previous_status or previous_status[deviceID] != deviceStatus:
                functions.device_stats_update_database.update_device_stats(deviceID, deviceType)
                previous_status[deviceID] = deviceStatus
        time.sleep(60)  # Check every 60 seconds

def run_scheduler():
    # Run the scheduler to execute pending tasks
    while True:
        schedule.run_pending()
        time.sleep(1)

# Schedule device updates
schedule_device_updates()

# Start the scheduler in a separate thread
threading.Thread(target=run_scheduler).start()

# Start monitoring device status changes in a separate thread
threading.Thread(target=monitor_device_status).start()