import functions.database_execute, functions.device_management, datetime, decimal, random

def update_device_stats(deviceID, deviceType):
    # Fetch device stats from the database
    result = functions.database_execute.execute_SQL("""
        SELECT energyConsumption, energyGeneration, deviceUsage, deviceStatus
        FROM Devices 
        WHERE deviceID = %s
    """, (deviceID,))

    if not result:
        print(f"No data found for deviceID {deviceID}")
        return

    energy_consumption = result[0][0]
    energy_generation = result[0][1]
    device_usage = int(result[0][2])
    device_status = result[0][3]
    cost_of_energy = decimal.Decimal(str(0.60)) * energy_consumption
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    base_efficiency = functions.database_execute.execute_SQL("""
                        SELECT energyConsumptionPerHour FROM DeviceData WHERE deviceType = %s
                        """, (deviceType,))
    base_value = base_efficiency[0][0]
    random_factor = random.uniform(0.75, 1.25)
    final_efficiency = base_value * decimal.Decimal(str(random_factor))

    data = (
        deviceID,
        energy_consumption,
        energy_generation,
        cost_of_energy,
        device_usage,
        device_status,
        timestamp,
        final_efficiency
    )
    
    # Insert the updated device stats into the database
    return functions.database_execute.execute_SQL("""
        INSERT INTO DeviceStats (deviceID, energyConsumption, energyGeneration, costsOfEnergy, deviceUsage, deviceStatus, timestamp, efficiency) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, data)