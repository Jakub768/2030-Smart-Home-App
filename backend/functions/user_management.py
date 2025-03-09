import functions.database_execute

def add_user(username, password, eMailAddress, firstName, lastName, dateOfBirth):
    # Check if the username already exists
    result = functions.database_execute.execute_SQL("""
        SELECT * FROM Users WHERE username = %s
    """, (username,))

    if result is None:
        data = (username, password, eMailAddress, firstName, lastName, dateOfBirth)
        
        # Insert the new user into the database
        rows_affected = functions.database_execute.execute_SQL("""
            INSERT INTO Users (username, password, eMailAddress, firstName, lastName, dateOfBirth) 
            VALUES (%s, %s, %s, %s, %s, %s)
        """, data)

        if rows_affected:
            print(f"User '{username}' added successfully!")
        else:
            print("Failed to add user.")
    else:
        print("Duplicate username! User already exists.")

def remove_user(username):
    # Check if the user exists
    result = functions.database_execute.execute_SQL("""
        SELECT * FROM Users WHERE username = %s
    """, (username,))

    if result:
        # Delete the user from the database
        rows_deleted = functions.database_execute.execute_SQL("""
            DELETE FROM Users WHERE username = %s
        """, (username,))

        if rows_deleted:
            print(f"User '{username}' removed successfully!")
        else:
            print("Failed to remove user.")
    else:
        print("User not found.")