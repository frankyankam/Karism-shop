from flask import Blueprint, jsonify, request, abort
from extensions import db
from models import Product

# Blueprint unifié pour la gestion des produits
products_bp = Blueprint("products", __name__, url_prefix="/api/products")

@products_bp.route("/", methods=["GET"])
def list_products():
    try:
        prods = Product.query.all()
        # S'il n'y a pas de produits, on retourne un tableau vide
        if not prods:
            return jsonify([]), 200
        return jsonify([{
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "image_url": p.image_url,
            "model_url": p.model_url
        } for p in prods]), 200
    except Exception as e:
        # En cas d'erreur, on renvoie une réponse d'erreur avec un message
        return jsonify({"error": str(e)}), 500

@products_bp.route("/", methods=["POST"])
def create_product():
    data = request.get_json() or {}
    # Champs obligatoires : name, price
    if not all(k in data for k in ("name", "price")):
        abort(400, "name et price sont requis")
    # Création du produit
    p = Product(
        brand       = data.get("brand"),
        name        = data["name"],
        description = data.get("description"),
        price       = float(data["price"]),
        image_url   = data.get("image_url"),
        model_url   = data.get("model_url")
    )
    db.session.add(p)
    db.session.commit()
    
    return jsonify(id=p.id), 201
@products_bp.route("/api/products/<int:id>", methods=["GET"])
def get_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product.serialize())
