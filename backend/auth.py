import os
from flask import Blueprint, request, jsonify, current_app, url_for, abort
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_mail import Message
from datetime import timedelta

from extensions import db, mail
from models import Client

# Blueprint consolidé pour auth (inscription, login, reset password)
auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

# Serializer pour tokens de reset
def get_serializer():
    return URLSafeTimedSerializer(current_app.config["JWT_SECRET_KEY"])

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    password = data.get('password')
    if not all([name, phone, password]):
        abort(400, "name, phone et password sont requis")
    # Vérifie si existant
    if Client.query.filter((Client.phone == phone) | (Client.email == email)).first():
        return jsonify(error="Client déjà existant"), 409

    client = Client(name=name, phone=phone, email=email)
    client.set_password(password)
    db.session.add(client)
    db.session.commit()
    return jsonify(message="Inscription OK", client_id=client.id), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    identifier = data.get('phone_or_email') or data.get('phone') or data.get('email')
    password = data.get('password')
    if not identifier or not password:
        abort(400, "Identifiant et mot de passe requis")
    client = Client.query.filter((Client.phone == identifier) | (Client.email == identifier)).first()
    if client and client.check_password(password):
        token = create_access_token(identity=client.id, expires_delta=timedelta(hours=1))
        return jsonify(token=token, client_id=client.id), 200
    return jsonify(error="Identifiants invalides"), 401

@auth_bp.route('/request-reset', methods=['POST'])
def request_reset():
    data = request.get_json() or {}
    email = data.get('email')
    if not email:
        abort(400, "email requis")
    client = Client.query.filter_by(email=email).first()
    if client:
        s = get_serializer()
        token = s.dumps(client.email, salt="password-reset-salt")
        link = url_for('auth.reset_password', token=token, _external=True)
        msg = Message(
            subject="Réinitialisation de votre mot de passe",
            recipients=[client.email]
        )
        msg.body = (
            f"Bonjour {client.name},\n\n"
            f"Réinitialisez votre mot de passe via ce lien (1h de validité) : {link}\n\n"
            "Si vous n’avez pas demandé, ignorez cet email."
        )
        mail.send(msg)
    # Toujours renvoyer 200 pour éviter de révéler l'existence de l'email
    return jsonify(message="Email envoyé si le compte existe"), 200

@auth_bp.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    data = request.get_json() or {}
    new_pwd = data.get('password') or data.get('new_password')
    if not new_pwd:
        abort(400, "password requis")
    s = get_serializer()
    try:
        email = s.loads(token, salt="password-reset-salt", max_age=3600)
    except SignatureExpired:
        return jsonify(error="Le lien a expiré"), 400
    except BadSignature:
        return jsonify(error="Lien invalide"), 400

    client = Client.query.filter_by(email=email).first_or_404()
    client.set_password(new_pwd)
    db.session.commit()
    return jsonify(message="Mot de passe réinitialisé"), 200
