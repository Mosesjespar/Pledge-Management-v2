from flask import Flask, request, jsonify
from flask_cors import CORS
import program
import contributor
import user
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import unset_jwt_cookies
from datetime import datetime, timedelta, timezone

api = Flask(__name__)
CORS(api)
api.config["JWT_TOKEN_LOCATION"] = ["headers"]
api.config['JWT_SECRET_KEY'] = 'icui4rcubro'
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=30)
jwt = JWTManager(api)


@api.route('/')
def main():
    return {
        'msg': 'hello world'
    }


@api.route('/add_program', methods=['POST'])
@jwt_required()
def add_program():
    name = request.json['name']
    target = request.json['target']
    minimum = request.json['min']
    return program.add_program(name, target, minimum, 0)


@api.route('/get_programs', methods=['GET'])
@jwt_required()
def get_programs():
    return program.get_programs()


@api.route('/add_contributor', methods=['POST'])
@jwt_required()
def add_contributor():
    name = request.json['name']
    pledge_amount = request.json['pledge_amount']
    prog = request.json['Program']
    payments = request.json['Payments']
    return contributor.add_program_contributor(name, pledge_amount, payments, prog)


@api.route('/get_contributors', methods=['GET'])
@jwt_required()
def get_contributors():
    return contributor.get_contributors()


@api.route('/add_contributor_payment', methods=['POST'])
@jwt_required()
def add_payment():
    prog = request.json['program']
    payment = request.json['payment']
    contributor_name = request.json['name']
    program.make_program_payment(prog, contributor_name, payment)
    contributor.make_contributor_payment(payment, contributor_name, prog)
    return {
        'msg': f'Payment for {prog} made successfully'
    }


@api.route('/add_user', methods=['POST'])
@jwt_required()
def add_user():
    name = request.json['username']
    passw = request.json['password']
    u_type = request.json['type']
    return user.add_user(name, passw, u_type)


@api.route('/login', methods=['POST'])
def login():
    name = request.json['username']
    passw = request.json['password']
    acc_token = create_access_token(identity=name)
    info = user.login(name, passw)
    if len(info) > 0:
        return {
            'isLoggedIn': True,
            'username': info[0][1],
            'usertype': info[0][3],
            'access_tkn': acc_token
        }
    if len(info) == 0:
        return {
                   'msg': 'Unknown User',
                   'isLoggedIn': False,
               }, 401


@api.route('/logout')
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


if __name__ == '__main__':
    api.run(debug=True)
