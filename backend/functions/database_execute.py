import mysql.connector
from mysql.connector import Error

def execute_SQL(query, params=None):
    try:
        with mysql.connector.connect(
            host="virtual-butler-minchengpiao03152004-8434.g.aivencloud.com",
            port=19919,
            user="avnadmin",
            password="AVNS_7DhSsm_1tMr-6iMrMjc",
            database="virtual_butler"
        ) as mydb, mydb.cursor() as cursor:
            cursor.execute(query, params) if params else cursor.execute(query)
            
            if query.strip().lower().startswith("select"):
                results = cursor.fetchall()
            else:
                mydb.commit()
                print("Commit successful!")
                results = cursor.rowcount

        return results
    except Error as e:
        return f"Error: {e}"