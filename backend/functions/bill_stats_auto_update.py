import functions.bill_stats_update_database
import functions.database_execute, functions.device_stats_update_database, schedule, time, threading
from datetime import datetime

def scheduled_bill_update(houseID):
    functions.bill_stats_update_database.update_bill_stats(houseID)

def schedule_updates():
    houses = functions.database_execute.execute_SQL("SELECT houseID FROM House")
    for houseID, in houses:
        next_bill_due_result = functions.database_execute.execute_SQL(
            "SELECT nextBillDue FROM BillStats WHERE houseID = %s ORDER BY nextBillDue DESC LIMIT 1", (houseID,)
        )
        
        if next_bill_due_result:
            next_bill_due_time = next_bill_due_result[0][0]
            current_time = datetime.today().date()
            delay_days = (next_bill_due_time - current_time).days
            if delay_days > 0:
                schedule.every(delay_days).days.do(scheduled_bill_update, houseID=houseID)
            else:
                scheduled_bill_update(houseID)
        else:
            scheduled_bill_update(houseID)

def run_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(1)

# Schedule updates
schedule_updates()

# Start the scheduler in a separate thread
threading.Thread(target=run_scheduler).start()