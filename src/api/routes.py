"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import timedelta, timezone, datetime
from flask_jwt_extended import JWTManager
#from api.utils import generate_sitemap, APIException, get_access_token




api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)




@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods = ['POST'])
def signup():

    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"msg": "Datos incompletos, por favor llenar todos"}), 400
    
    user = User.query.filter_by(email = email).first()

    if user:
        return jsonify({'msg': "El email ya esta en uso"}), 400
    
    password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    new_user = User(email = email, password = password_hash)

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201


@api.route('/login', methods = ['POST'])
def login():
    try:

        email = request.json.get("email")
        password = request.json.get("password")

        if not email or not password:
            return jsonify({"msg": "Datos incompletos, por favor llenar todos"}), 400
        
        user = User.query.filter_by(email = email).first()

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404
        
        password_db = user.password

        valid_password = bcrypt.check_password_hash(password_db, password)

        if valid_password:
            expires = timedelta(days=1)
            user_id = user.id

            access_token = create_access_token(
                identity = str(user_id),
                expires_delta = expires,
            )

            db.session.commit()

            return jsonify({"msg": "Usuario logueado con exito", "token": access_token}), 201
            
    except Exception as e:
        return jsonify({"msg": f"Ocurrio el siguiente error: f{e}"})
    
    else:
        return jsonify({"msg": "Contraseña incorrecta"}), 400


@api.route('/private', methods=['GET'])
@jwt_required()
def get_private():
    
    message = {"msg":"Bienvenido a la ventana privada"}
    return jsonify(message), 201