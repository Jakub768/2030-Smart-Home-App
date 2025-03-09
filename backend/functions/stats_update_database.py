import functions.database_execute, functions.device_management, datetime

energy_price = 1

def update_stats(deviceID):
    result = functions.database_execute.execute_SQL("""
        SELECT energyConsumption, energyGeneration, deviceUsage, deviceStatus FROM Devices WHERE deviceID = %s
    """, (deviceID,))

    energy_consumption = result[0][0]

    energy_generation = result[0][1]

    cost_of_energy = energy_price * energy_consumption

    device_usage = int(result[0][2])
    
    device_status = result[0][3]

    timestamps = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    data = (
        deviceID,
        energy_consumption,
        energy_generation,
        cost_of_energy,
        device_usage,
        device_status,
        timestamps
    )

    functions.device_management.reset_usage(deviceID)
    
    return functions.database_execute.execute_SQL(
        """INSERT INTO Stats (deviceID, energyConsumption, energyGeneration, costsOfEnergy, robotUsage, robotStatus, timestamps) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, data
    )
