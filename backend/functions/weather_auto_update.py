import database_execute, weather_update_database, schedule, time, threading

for houseID, in database_execute.execute_SQL("SELECT houseID FROM House"):
    schedule.every(1).seconds.do(weather_update_database.update_weather, houseID)

def run_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(1)

threading.Thread(target=run_scheduler).start()