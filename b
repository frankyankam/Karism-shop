# backend/seed.py

import random
from faker import Faker
from app import create_app
from extensions import db
from models import Client, Product, Cart, CartItem, Order, OrderItem

fake = Faker(locale="fr_FR")  # Pour des données françaises


def create_clients(n=10):
    clients = []
    for _ in range(n):
        name = fake.name()
        phone = fake.phone_number()
        email = fake.email()
        password = "test1234"

        client = Client(name=name, phone=phone, email=email)
        client.set_password(password)
        clients.append(client)

    db.session.add_all(clients)
    db.session.commit()
    return clients


def create_products(n=20):
    sample_images = [
        "/image/AIR+MAX+DN.avif",
        "/image/image.jpg",
        "/image/AIR+FORCE+1+'07.avif",
        "/image/converse.jpg",
        "/image/NIKE+AIR+MAX+95.avif",
        "/image/lacoste.jpg",
        "/image/AIR+MAX+DN (2).avif",
        "/image/NewBalance.jpg",
        "/image/AIR+MAX+DN.jpg",
        "/image/AIR+FORCE+1+'07 (1).avif",
    ]
    sample_models = [
        "/image/nike_flipflops.glb",
        "/image/nike_air_zoom_pegasus_36.glb",
        "/image/nike_air_force.glb",
    ]

    products = []
    for i in range(n):
        name = f"Yanki {fake.word().capitalize()} {random.randint(100, 999)}"
        price = round(random.uniform(79.99, 199.99), 2)
        img = random.choice(sample_images)
        mdl = random.choice(sample_models)

        product = Product(
            name=name,
            description=f"{name} - {fake.sentence(nb_words=6)}",
            price=price,
            image_url=img,
            model_url=mdl
        )
        products.append(product)

    db.session.add_all(products)
    db.session.commit()
    return products


def create_cart_and_order_for_client(client, products):
    cart = Cart(client_id=client.id)
    db.session.add(cart)
    db.session.commit()

    # Ajouter entre 1 et 3 articles dans le panier
    for _ in range(random.randint(1, 3)):
        product = random.choice(products)
        quantity = random.randint(1, 2)
        cart_item = CartItem(cart_id=cart.id, product_id=product.id, quantity=quantity)
        db.session.add(cart_item)

    db.session.commit()

    # Optionnellement créer une commande
    if random.choice([True, False]):
        # 🛠️ Crée l'Order avec total=0.0
        order = Order(client_id=client.id, total=0.0)
        db.session.add(order)
        db.session.commit()

        total = 0.0
        for _ in range(random.randint(1, 2)):
            product = random.choice(products)
            quantity = random.randint(1, 2)
            total_price = product.price * quantity
            total += total_price

            order_item = OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=quantity,
                total_price=round(total_price, 2)
            )
            db.session.add(order_item)

        # 🛠️ Mets à jour le total de la commande
        order.total = round(total, 2)
        db.session.commit()



def seed(drop_and_create=True):
    app = create_app()
    with app.app_context():
        try:
            if drop_and_create:
                db.drop_all()
                db.create_all()

            clients = create_clients()
            products = create_products()

            for client in clients:
                create_cart_and_order_for_client(client, products)

            # Résumé
            print("✅ Database seeded successfully:")
            print(f"  Clients    : {Client.query.count()}")
            print(f"  Products   : {Product.query.count()}")
            print(f"  Carts      : {Cart.query.count()}")
            print(f"  CartItems  : {CartItem.query.count()}")
            print(f"  Orders     : {Order.query.count()}")
            print(f"  OrderItems : {OrderItem.query.count()}")

        except Exception as e:
            print(f"❌ An error occurred while seeding the database: {e}")
            db.session.rollback()


if __name__ == "__main__":
    seed()
