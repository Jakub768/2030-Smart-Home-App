import database_execute

def add_device(Name, Type, roomID, userID, Consumption, energyGen, status):

    data = (
        Name,
        Type,
        roomID,
        userID,
        Consumption,
        energyGen,
        status
    )

    print("lol")
    database_execute.execute_SQL("""
        INSERT INTO Devices (deviceName, deviceType, roomID, userID, energyConsumption, energyGeneration, status) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)""",
        data
    )
    

def remove_device(deviceID):
    pass

add_device("haha", "lol", 1, 1, 20.0, 15.0, 'active')