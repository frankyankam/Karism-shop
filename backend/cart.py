# backend/cart.py
from flask import Blueprint, jsonify, request, abort
from extensions import db
from models import Cart, CartItem, Product

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/<int:client_id>', methods=['GET'])
def get_cart(client_id):
    cart = Cart.query.filter_by(client_id=client_id).first()
    if not cart:
        return jsonify(items=[]), 200
    items = [{
        "id":         i.id,
        "product_id": i.product_id,
        "name":       i.product.name,
        "price":      i.product.price,
        "image_url":  i.product.image_url,
        "quantity":   i.quantity
    } for i in cart.items]
    return jsonify(items=items), 200

@cart_bp.route('/<int:client_id>/items', methods=['POST'])
def add_to_cart(client_id):
    data = request.get_json() or {}
    if not all(k in data for k in ("product_id","quantity")):
        abort(400, "product_id et quantity requis")
    prod = Product.query.get(data["product_id"])
    if not prod:
        abort(404, "Produit non trouvé")

    cart = Cart.query.filter_by(client_id=client_id).first()
    if not cart:
        cart = Cart(client_id=client_id)
        db.session.add(cart); db.session.commit()

    item = CartItem.query.filter_by(cart_id=cart.id, product_id=prod.id).first()
    if item:
        item.quantity += int(data["quantity"])
    else:
        item = CartItem(cart_id=cart.id, product_id=prod.id, quantity=int(data["quantity"]))
        db.session.add(item)

    db.session.commit()
    return jsonify(id=item.id), 201

@cart_bp.route('/items/<int:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    data = request.get_json() or {}
    if "quantity" not in data:
        abort(400, "quantity requis")
    item = CartItem.query.get(item_id)
    if not item:
        abort(404, "CartItem non trouvé")
    item.quantity = int(data["quantity"])
    db.session.commit()
    return jsonify(id=item.id, quantity=item.quantity), 200

@cart_bp.route('/items/<int:item_id>', methods=['DELETE'])
def delete_cart_item(item_id):
    item = CartItem.query.get(item_id)
    if not item:
        abort(404, "CartItem non trouvé")
    db.session.delete(item); db.session.commit()
    return jsonify(), 204

@cart_bp.route('/<int:client_id>', methods=['DELETE'])
def clear_cart(client_id):
    cart = Cart.query.filter_by(client_id=client_id).first()
    if cart:
        for i in cart.items:
            db.session.delete(i)
        db.session.commit()
    return jsonify(), 204