import mysql.connector

db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='mjespar20',
    database='church_db'
)
cur = db.cursor()


def program_contributor_exists(name, program):
    q = 'SELECT * FROM contributors WHERE Name = %s AND Program = %s'
    data = (name, program)
    cur.execute(q, data)
    result = cur.fetchall()
    return len(result) > 0


def add_program_contributor(name, pledge_amount, payments, program):
    q = 'INSERT INTO contributors(Name, Pledge_Amount, Made_Payments, Program) VALUES (%s,%s,%s,%s)'
    data = (name, pledge_amount, payments, program)
    if not program_contributor_exists(name, program):
        cur.execute(q, data)
        db.commit()
        return {
            'msg': f'{name} registered as {program} contributor'
        }
    if program_contributor_exists(name, program):
        return {
            'msg': f'{name} is already a contributor for {program}'
        }
    else:
        return {
            'msg': 'An error occurred'
        }


def get_contributors():
    cur.execute('SELECT * FROM contributors')
    data = cur.fetchall()
    contributors = []
    for contributor in data:
        contributors.append({
            'id': contributor[0],
            'name': contributor[1],
            'amount': contributor[2],
            'payments': contributor[3],
            'program': contributor[4]
        })

    return {
        'contributors': contributors
    }


def make_contributor_payment(amount, contributor_name, program):
    contributor_query = 'UPDATE contributors SET Made_Payments = Made_Payments + %s WHERE Name = %s AND Program = %s'
    contributor_data = (amount, contributor_name, program)
    cur.execute(contributor_query, contributor_data)
    db.commit()
    return {
        'msg': f'Payment for {program} made successfully'
    }
