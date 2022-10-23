import mysql.connector

db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='mjespar20',
    database='church_db'
)
cur = db.cursor()


def program_exists(name):
    q = 'SELECT * FROM  church_db.programs WHERE Name = %s'
    data = (name,)
    cur.execute(q, data)
    result = cur.fetchall()
    return len(result) > 0


def add_program(name, budget_amount, minimum_payment, collected):
    q = 'INSERT INTO programs(Name, Budget_Amount, Minimum_Payment, Collected_Amount ) VALUES(%s,%s,%s,%s) '
    data = (name, budget_amount, minimum_payment, collected)
    if not program_exists(name):
        cur.execute(q, data)
        db.commit()
        return {
            'msg': f'{name} program added successfully'
        }
    if program_exists(name):
        return {
            'msg': f'{name} is already a program'
        }
    else:
        return {
            'msg': 'An error occurred'
        }


def get_programs():
    cur.execute('SELECT * FROM programs')
    data = cur.fetchall()
    programs = []
    for program in data:
        programs.append({
            'id': program[0],
            'name': program[1],
            'budget_amount': program[2],
            'min_payment': program[3],
            'collected': program[4]
        })
    return {
        'programs': programs
    }


def make_program_payment(program, contributor_name, amount):
    program_query = 'UPDATE programs SET Collected_Amount = Collected_Amount + %s WHERE Name = %s'
    program_data = (amount, program)
    cur.execute(program_query, program_data)
    db.commit()
    return {
        'msg': f'Payment for {program} made successfully'
    }



