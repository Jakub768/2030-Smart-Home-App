import database_execute, datetime

def add_user(username, password, eMailAddress, firstName, lastName, dateOfBirth, roles):

    data = (
        username,
        password,
        eMailAddress,
        firstName,
        lastName,
        dateOfBirth,
        roles
    )


    result = database_execute.execute_SQL("""
        SELECT * FROM Users WHERE username = %s
        """, (username,))
    
    if not result:
        database_execute.execute_SQL("""
            INSERT INTO Users (username, password, eMailAddress, firstName, lastName, dateOfBirth, roles) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, data
        )
        print("Add user successful")
    else:
        print("Duplicate username")

    

def remove_user(username):

    database_execute.execute_SQL("""
        DELETE FROM Users
        WHERE username = %s;
        """,
        (username,)
    )
    print("Remove user successful")

def change_role(username, role):
    if role in ("admin", "user", "guest"):
        data = (
            role,
            username
        )

        database_execute.execute_SQL("""
            UPDATE Users
            SET roles = %s
            WHERE username = %s;
            """,
            data
        )
        print("Role change successful")
    else:
        print("Invalid role")

change_role("AdamA", "admin")