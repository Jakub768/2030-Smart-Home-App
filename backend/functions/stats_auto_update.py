import functions.database_execute, functions.stats_update_database, schedule, time, threading

for deviceID, in functions.database_execute.execute_SQL("SELECT deviceID FROM Devices"):
    schedule.every(10).seconds.do(functions.stats_update_database.update_stats, deviceID)

def run_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(1)

threading.Thread(target=run_scheduler).start()