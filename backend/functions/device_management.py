import functions.database_execute

def add_device(deviceName, deviceType, roomID, userID, energyConsumption, energyGeneration):
    result = functions.database_execute.execute_SQL("""
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
            "inactive",
            0
            )

        rows_affected = functions.database_execute.execute_SQL("""
            INSERT INTO Devices (deviceName, deviceType, roomID, userID, energyConsumption, energyGeneration, deviceStatus, deviceUsage) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, data)

        if rows_affected:
            print(f"Device '{deviceName}' added successfully!")
        else:
            print("Failed to add device.")
    else:
        print("Device already exists.")


def remove_device(deviceID):
    result = functions.database_execute.execute_SQL("""
        SELECT * FROM Devices WHERE deviceID = %s
    """, (deviceID,))

    if result:
        rows_deleted = functions.database_execute.execute_SQL("""
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

    result = functions.database_execute.execute_SQL("""
        SELECT * FROM Devices WHERE deviceID = %s
    """, (deviceID,))

    if result:
        rows_updated = functions.database_execute.execute_SQL("""
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

def device_activate(deviceID):
    result = functions.database_execute.execute_SQL("""
        SELECT deviceName FROM Devices WHERE deviceID = %s AND deviceStatus = 'inactive'
    """, (deviceID,))

    if result:
        rows_updated = functions.database_execute.execute_SQL("""
            UPDATE Devices
            SET deviceStatus = %s
            WHERE deviceID = %s;
        """, ("active", deviceID))
        if rows_updated:
            print(f"Device ID '{deviceID}' activated successfully!")
        else:
            print(f"Failed to activate {result[0][0]}.")
    else:
        print("Device already active or not found.")

def device_activate(deviceID):
    result = functions.database_execute.execute_SQL("""
        SELECT deviceName FROM Devices WHERE deviceID = %s AND deviceStatus = 'active'
    """, (deviceID,))

    if result:
        rows_updated = functions.database_execute.execute_SQL("""
            UPDATE Devices
            SET deviceStatus = %s,
            deviceUsage = deviceUsage + 1
            WHERE deviceID = %s;
        """, ("inactive", deviceID))
        if rows_updated:
            print(f"Device ID '{deviceID}' deactivated successfully!")
        else:
            print(f"Failed to deactivate {result[0][0]}.")
    else:
        print("Device already deactivated or not found.")

def reset_usage(deviceID):
    result = functions.database_execute.execute_SQL("""
        SELECT deviceUsage FROM Devices WHERE deviceID = %s
    """, (deviceID,))

    if not result:
        print("Device not found.")
        return

    current_usage = result[0][0]

    if current_usage == 0:
        print("Device usage is already 0. No update needed.")
        return

    rows_updated = functions.database_execute.execute_SQL(
        """
        UPDATE Devices
        SET deviceUsage = 0
        WHERE deviceID = %s;
        """, (deviceID,)
    )

    if rows_updated:
        print("Device usage has been successfully reset to 0!")
    else:
        print("Failed to reset device usage.")
