import functions.database_execute
import functions.device_management
import datetime

def update_bill_stats(houseID):
    # Fetch the total cost of energy for the house
    result = functions.database_execute.execute_SQL("""
        SELECT SUM(ds.costsOfEnergy) AS total_cost_of_energy
        FROM DeviceStats ds
        JOIN Devices d ON ds.deviceID = d.deviceID
        JOIN Rooms r ON d.roomID = r.roomID
        WHERE r.houseID = %s;
    """, (houseID,))

    amount = result[0][0] if result and result[0][0] is not None else 0
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    next_bill_due = (datetime.datetime.now() + datetime.timedelta(days=30)).strftime("%Y-%m-%d %H:%M:%S")

    data = (
        houseID,
        amount,
        next_bill_due,
        timestamp
    )

    # Insert the new bill stats
    functions.database_execute.execute_SQL("""
        INSERT INTO BillStats (houseID, amount, nextBillDue, timestamp) 
        VALUES (%s, %s, %s, %s);
    """, data)

def update_paid_status(billID):
    # Update the paid status of the bill
    return functions.database_execute.execute_SQL("""
        UPDATE BillStats SET paid = 1 WHERE billID = %s
    """, (billID,))