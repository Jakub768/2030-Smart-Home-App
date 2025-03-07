import database_execute

def add_user(username, password, eMailAddress, firstName, lastName, dateOfBirth, roles):
    result = database_execute.execute_SQL("""
        SELECT * FROM Users WHERE username = %s
    """, (username,))

    if result is None:
        data = (username, password, eMailAddress, firstName, lastName, dateOfBirth, roles)
        
        rows_affected = database_execute.execute_SQL("""
            INSERT INTO Users (username, password, eMailAddress, firstName, lastName, dateOfBirth, roles) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, data)

        if rows_affected:
            print(f"User '{username}' added successfully!")
        else:
            print("Failed to add user.")

    else:
        print("Duplicate username! User already exists.")


def remove_user(username):
    
    result = database_execute.execute_SQL("""
        SELECT * FROM Users WHERE username = %s
    """, (username,))

    if result:
        rows_deleted = database_execute.execute_SQL("""
            DELETE FROM Users WHERE username = %s
        """, (username,))

        if rows_deleted:
            print(f"User '{username}' removed successfully!")
        else:
            print("Failed to remove user.")
    else:
        print("User not found.")


def change_role(username, role):

    if role not in ("admin", "user", "guest"):
        print("Invalid role! Choose from 'admin', 'user', or 'guest'.")
        return

    result = database_execute.execute_SQL("""
        SELECT * FROM Users WHERE username = %s
    """, (username,))

    if result:
        rows_updated = database_execute.execute_SQL("""
            UPDATE Users
            SET roles = %s
            WHERE username = %s;
        """, (role, username))

        if rows_updated:
            print(f"Role changed successfully for '{username}' to '{role}'.")
        else:
            print("Failed to change role.")
    else:
        print("User not found.")