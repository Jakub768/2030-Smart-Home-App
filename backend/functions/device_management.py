import database_execute

def add_device(deviceName, deviceType, roomID, userID, energyConsumption, energyGeneration, status):
    result = database_execute.execute_SQL("""
        SELECT * FROM Devices WHERE deviceName = %s AND userID = %s
    """, (deviceName, userID))

    if result is None:
        data = (
            deviceName, 
            deviceType, 
            roomID, 
            userID, 
            energyConsumption, 
            energyGeneration, 
            status
            )

        rows_affected = database_execute.execute_SQL("""
            INSERT INTO Devices (deviceName, deviceType, roomID, userID, energyConsumption, energyGeneration, status) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, data)

        if rows_affected:
            print(f"Device '{deviceName}' added successfully!")
        else:
            print("Failed to add device.")
    else:
        print("Device already exists.")


def remove_device(deviceID):
    result = database_execute.execute_SQL("""
        SELECT * FROM Devices WHERE deviceID = %s
    """, (deviceID,))

    if result:
        rows_deleted = database_execute.execute_SQL("""
            DELETE FROM Devices WHERE deviceID = %s;
        """, (deviceID,))

        if rows_deleted:
            print(f"Device with ID '{deviceID}' removed successfully!")
        else:
            print("Failed to remove device.")
    else:
        print("Device not found.")


def change_name(deviceID, newDeviceName):
    """ Updates the name of a device if it exists. """

    result = database_execute.execute_SQL("""
        SELECT * FROM Devices WHERE deviceID = %s
    """, (deviceID,))

    if result:
        rows_updated = database_execute.execute_SQL("""
            UPDATE Devices
            SET deviceName = %s
            WHERE deviceID = %s;
        """, (newDeviceName, deviceID))

        if rows_updated:
            print(f"Device ID '{deviceID}' renamed to '{newDeviceName}' successfully!")
        else:
            print("Failed to update device name.")
    else:
        print("Device not found.")