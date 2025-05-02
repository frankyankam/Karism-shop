from flask import Blueprint, request, jsonify
from models import db, Client

clients_bp = Blueprint('clients', __name__)

@clients_bp.route("/register", methods=["POST"])
def register_client():
    data = request.get_json()
    name = data.get("name")
    phone = data.get("phone")
    email = data.get("email")
    password = data.get("password")

    if not all([name, phone, password]):
        return jsonify({"error": "Nom, téléphone et mot de passe requis"}), 400

    if Client.query.filter((Client.phone == phone) | (Client.email == email)).first():
        return jsonify({"error": "Client déjà enregistré"}), 409

    client = Client(name=name, phone=phone, email=email)
    client.set_password(password)

    db.session.add(client)
    db.session.commit()

    return jsonify({"message": "Inscription réussie", "client_id": client.id}), 201


@clients_bp.route("/login", methods=["POST"])
def login_client():
    data = request.get_json()
    identifier = data.get("phone") or data.get("email")
    password = data.get("password")

    if not identifier or not password:
        return jsonify({"error": "Identifiant et mot de passe requis"}), 400

    client = Client.query.filter((Client.phone == identifier) | (Client.email == identifier)).first()

    if client and client.check_password(password):
        return jsonify({"message": "Connexion réussie", "client_id": client.id}), 200
    else:
        return jsonify({"error": "Identifiants invalides"}), 401
