import database_execute

def update_bill_stats(houseID, amount, next_bill_due, timestamp):
    data = (
        houseID,
        amount,
        next_bill_due,
        timestamp
    )

    database_execute.execute_SQL("""
        INSERT INTO BillStats (houseID, amount, nextBillDue, timestamp) 
        VALUES (%s, %s, %s, %s);
    """, data)

def update_paid_status(billID):
    return database_execute.execute_SQL("""
        UPDATE BillStats SET paidStatus = 1 WHERE billID = %s
    """, (billID,))