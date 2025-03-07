import mysql.connector
from mysql.connector import Error

def execute_SQL(query, params=None):
    try:
        mydb = mysql.connector.connect(
            host="virtual-butler-minchengpiao03152004-8434.g.aivencloud.com",
            port=19919,
            user="avnadmin",
            password="AVNS_7DhSsm_1tMr-6iMrMjc",
            database="virtual_butler"
        )

        cursor = mydb.cursor()

        cursor.execute(query, params) if params else cursor.execute(query)

        if query.strip().lower().startswith("select"):
            results = cursor.fetchall()
            return results if results else None
        
        mydb.commit()
        print("Commit successful!")
        return cursor.rowcount

    except Error as e:
        print(f"Database Error: {e}")
        return None

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'mydb' in locals():
            mydb.close()