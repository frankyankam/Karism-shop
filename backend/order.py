from flask import Blueprint, request, jsonify, abort
from extensions import db
from models import Order, OrderItem, Client, Product

# Blueprint consolidé pour les commandes
order_bp = Blueprint("orders", __name__, url_prefix="/api/orders")

@order_bp.route("/", methods=["GET"])
def list_orders():
    orders = Order.query.all()
    result = []
    for o in orders:
        items = [{
            "id":          item.id,
            "product_id":  item.product_id,
            "product_name":item.product.name,
            "quantity":    item.quantity,
            "total_price": item.total_price
        } for item in o.items]
        result.append({
            "id":         o.id,
            "client_id":  o.client_id,
            "created_at": o.created_at.isoformat(),
            "items":      items
        })
    return jsonify(result), 200

@order_bp.route("/", methods=["POST"])
def create_order():
    data = request.get_json() or {}
    client_id  = data.get("client_id")
    product_id = data.get("product_id")
    quantity   = data.get("quantity")
    if not all([client_id, product_id, quantity]):
        abort(400, "client_id, product_id et quantity sont requis")

    client = Client.query.get(client_id)
    product = Product.query.get(product_id)
    if not client or not product:
        abort(404, "Client ou produit introuvable")

    qty   = int(quantity)
    total = qty * product.price

    # Création de la commande
    order = Order(client_id=client.id)
    db.session.add(order)
    db.session.commit()  # pour obtenir order.id

    # Création de l'OrderItem
    order_item = OrderItem(
        order_id    = order.id,
        product_id  = product.id,
        quantity    = qty,
        total_price = total
    )
    db.session.add(order_item)
    db.session.commit()

    return jsonify(order_id=order.id, item_id=order_item.id), 201
