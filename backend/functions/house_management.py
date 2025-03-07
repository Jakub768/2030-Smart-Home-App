import database_execute, requests

def is_valid_address(address, city, postcode):
    full_address = f"{address}, {city}, {postcode}"
    url = f"https://nominatim.openstreetmap.org/search?format=json&q={full_address}"
    response = requests.get(url).json()
    
    return len(response) > 0


def add_house(postcode, street, city, userID):
    if is_valid_address(street, city, postcode):
        result = database_execute.execute_SQL("""
            SELECT * FROM House WHERE postcode = %s
        """, (postcode,))
        
        if result is None:
            data = (
                postcode, 
                street, 
                city, 
                userID
                )
            
            rows_affected = database_execute.execute_SQL("""
                INSERT INTO House (postcode, street, city, userID) 
                VALUES (%s, %s, %s, %s)
            """, data)

            if rows_affected:
                print("House added successfully!")
            else:
                print("Failed to add house.")
        else:
            print("Duplicate address found.")
    else:
        print("Invalid Address.")


def remove_house(postcode):
    result = database_execute.execute_SQL("""
        SELECT * FROM House WHERE postcode = %s
    """, (postcode,))

    if result:
        rows_deleted = database_execute.execute_SQL("""
            DELETE FROM House WHERE postcode = %s;
        """, (postcode,))

        if rows_deleted:
            print(f"House with postcode '{postcode}' removed successfully!")
        else:
            print("Failed to remove house.")
    else:
        print("House not found.")


def change_house_data(userID, postcode, street, city):
    """ Updates house details if the house exists. """
    
    result = database_execute.execute_SQL("""
        SELECT houseID FROM House 
        WHERE userID = %s AND postcode = %s AND street = %s AND city = %s
    """, (userID, postcode, street, city))

    if result:
        house_id = result[0][0]

        data = (
            userID, 
            postcode, 
            street, 
            city, 
            house_id
            )

        rows_updated = database_execute.execute_SQL("""
            UPDATE House
            SET userID = %s, postcode = %s, street = %s, city = %s
            WHERE houseID = %s;
        """, data)

        if rows_updated:
            print("House data updated successfully!")
        else:
            print("Failed to update house data.")
    else:
        print("Invalid details, house not found.")