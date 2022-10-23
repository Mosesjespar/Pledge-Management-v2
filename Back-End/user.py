import mysql.connector

db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='mjespar20',
    database='church_db'
)
cur = db.cursor()


def isUser(name):
    cur.execute('SELECT * FROM users WHERE User_Name = %s', (name,))
    response = cur.fetchall()
    return len(response) > 0


def add_user(name, passw, type):
    user_query = 'INSERT INTO users(User_Name,Password,Type) VALUES(%s, %s, %s)'
    user_data = (name, passw, type)
    if isUser(name):
        return {
            'msg': f'{name} is already a User'
        }
    if not isUser(name):
        cur.execute(user_query, user_data)
        db.commit()
        return {
            'msg': f'New User {name} registered'
        }
    else:
        return {
            'msg': 'An error occurred'
        }


def login(name, password):
    login_query = 'SELECT * FROM users WHERE User_Name = %s AND Password = %s'
    login_data = (name, password)
    cur.execute(login_query, login_data)
    info = cur.fetchall()
    return info
