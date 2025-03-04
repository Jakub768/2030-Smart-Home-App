#KEY
#? -should
#   -must/important
#thing? - unsure if added

#call/run weather.py every 15 minutes

#import/export data from weather

#import/export data from/to SQL

#HTTP stuff

#make up the data


##SQL (admin)
#user access add
#user access delete 
#user access edit

#send email to user on signup

#user login (username & password)

#logout (/timeout?)

#admin mode - allow edit

#GDPR delete data

#add device
#remove device

#?categorise device

#turn on/off 'device' in app
#?schedule on/off of devices


#data (collect & show)
#energy consumption
#energy generation
#robot usage
#status
#device consumption

#sort by energy consumption

#stat breakdown ?

#stat compare last 2 weeks

#connect to internet

#connect to devices

#?reboot

#?error log

#permissions (owner/admin/user/guest)
#owner set up house

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