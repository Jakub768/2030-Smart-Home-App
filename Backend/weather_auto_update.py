import execute_DB, update_weather_DB, schedule, time, threading

for houseID, in execute_DB.execute_SQL("SELECT houseID FROM House"):
    schedule.every(15).minutes.do(update_weather_DB.update_weather, houseID)

def run_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(1)

threading.Thread(target=run_scheduler).start()