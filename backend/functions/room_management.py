import functions.database_execute

def add_room(roomName, userID, houseID):

    result = functions.database_execute.execute_SQL("""
        SELECT * FROM Rooms WHERE roomName = %s AND userID = %s
    """, (roomName, userID))

    if result is None:
        data = (
            roomName, 
            userID,
            houseID,
            "Free"
            )

        rows_affected = functions.database_execute.execute_SQL("""
            INSERT INTO Rooms (roomName, userID, houseID, occupation) 
            VALUES (%s, %s, %s, %s)
        """, data)

        if rows_affected:
            print(f"Room '{roomName}' added successfully!")
        else:
            print("Failed to add room.")
    else:
        print("Room already exists for this user.")


def remove_room(roomID):
    result = functions.database_execute.execute_SQL("""
        SELECT * FROM Rooms WHERE roomID = %s
    """, (roomID,))

    if result:
        rows_deleted = functions.database_execute.execute_SQL("""
            DELETE FROM Rooms WHERE roomID = %s;
        """, (roomID,))

        if rows_deleted:
            print(f"Room with ID '{roomID}' removed successfully!")
        else:
            print("Failed to remove room.")
    else:
        print("Room not found.")


def change_room_name(roomID, newRoomName):
    result = functions.database_execute.execute_SQL("""
        SELECT * FROM Rooms WHERE roomID = %s
    """, (roomID,))

    if result:
        rows_updated = functions.database_execute.execute_SQL("""
            UPDATE Rooms
            SET roomName = %s
            WHERE roomID = %s;
        """, (newRoomName, roomID))

        if rows_updated:
            print(f"Room ID '{roomID}' renamed to '{newRoomName}' successfully!")
        else:
            print("Failed to update room name.")
    else:
        print("Room not found.")


def change_room_status(roomID, newOccupation):

    if newOccupation not in ("Occupied", "Free"):
        print("Invalid status! Choose from 'Occupied' or 'Free'")
        return

    result = functions.database_execute.execute_SQL("""
        SELECT * FROM Rooms WHERE roomID = %s
    """, (roomID,))

    if result:
        rows_updated = functions.database_execute.execute_SQL("""
            UPDATE Rooms
            SET status = %s
            WHERE roomID = %s;
        """, (newOccupation, roomID))

        if rows_updated:
            print(f"Room ID '{roomID}' status changed to '{newOccupation}' successfully!")
        else:
            print("Failed to update room occupation.")
    else:
        print("Room not found.")