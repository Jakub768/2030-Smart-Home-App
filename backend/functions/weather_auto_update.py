import functions.database_execute
import functions.weather_update_database
import schedule
import time
import threading

def schedule_weather_updates():
    houses = functions.database_execute.execute_SQL("SELECT houseID FROM House")
    for houseID, in houses:
        schedule.every(15).minutes.do(functions.weather_update_database.update_weather, houseID)

def run_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(1)

# Schedule weather updates
schedule_weather_updates()

# Start the scheduler in a separate thread
threading.Thread(target=run_scheduler).start()