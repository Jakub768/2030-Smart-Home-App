import mysql.connector;

mydb = mysql.connector.connect(
  host="virtual-butler-minchengpiao03152004-8434.g.aivencloud.com",
  port=19919,
  user="avnadmin",
  password="AVNS_7DhSsm_1tMr-6iMrMjc",
  database="virtual_butler"
)

cursor = mydb.cursor()

cursor.execute("SELECT * FROM Users")

results = cursor.fetchall()
for row in results:
    print(row)

cursor.close()
mydb.close()