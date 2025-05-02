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

def create_products():
    # Création manuelle des produits
    product1 = Product(
        name="Yanki Vans",
        description="Chaussure moderne",
        price=159.99,
        image_url="/image/images3.jpg",
        model_url="/image/vans_-_practice.glb"
    )
    db.session.add(product1)

    product2 = Product(
        name="Yanki Nike Air Zoom",
        description="Confort optimal pour la course, rien que pour les suspendu",
        price=179.99,
        image_url="/image/image.jpg",
        model_url="/image/nike_air_zoom_pegasus_36.glb"
    )
    db.session.add(product2)

    product3 = Product(
        name="Air Force 1",
        description="Puma Suede Classic - Sneaker iconique en daim",
        price=89.99,
        image_url="/image/AIR+FORCE+1+'07.avif",
        model_url="/image/nike_air_force.glb"
    )
    db.session.add(product3)

    product4 = Product(
        name="Yanki Converse Chuck Taylor",
        description="Converse Chuck Taylor - Baskets emblématiques",
        price=69.99,
        image_url="/image/images2.jpg",
        model_url="/image/nike_flipflops.glb"
    )
    db.session.add(product4)

    product5 = Product(
        name="Yanki Dior",
        description="La chaussure des gars charismatiques les pains beurre au chocolat",
        price=219.99,
        image_url="/image/dior.jpg",
        model_url="/image/dior_mocasin_timeless_piel_becerro_negro.glb"
    )
    db.session.add(product5)
    product6 = Product(
        name="Yanki New Balance 990v5",
        description="New Balance 990v5 - Chaussure de sport de luxe",
        price=219.99,
        image_url="/image/images4.jpg",
        model_url="/image/nike_air_jordan_1.glb"
    )
    db.session.add(product6)
    product7 = Product(
        name="Yanki Nike prest Run",
        description=" Chaussure de sport de luxe",
        price=219.99,
        image_url="/image/nike.jpg",
        model_url="/image/nike_react_presto_running_shoes.glb"
    )
    db.session.add(product7)
    product8 = Product(
        name="Yanki Salomon_x_ultra",
        description="Chaussure des ingénieurs certifiés global",
        price=219.99,
        image_url="/image/images5.jpg",
        model_url="/image/salomon_x_ultra_04w.glb"
    )
    db.session.add(product8)
    product9 = Product(
        name="Yanki salomon xt6",
        description="travaillez avec le confort absolu",
        price=219.99,
        image_url="/image/salomon.jpg",
        model_url="/image/salomon_xt6_sneaker_photo_scan.glb"
    )
    db.session.add(product9)
    product10 = Product(
        name="Yanki blue vans",
        description="Chaussure trés top",
        price=219.99,
        image_url="/image/images6.jpg",
        model_url="/image/unused_blue_vans_shoe.glb"
    )
    db.session.add(product10)
    product11 = Product(
        name="Yanki Special",
        description="la chaussure des fruspendues ",
        price=219.99,
        image_url="/image/richelieu.jpg",
        model_url="/image/shoe.glb"
    )
    db.session.add(product11)
    product12 = Product(
        name="Yanki Adidas classique",
        description="le classique des classiques",
        price=219.99,
        image_url="/image/adidas_shoes.jpg",
        model_url="/image/adidas_shoes.glb"
    )
    db.session.add(product12)
    product13 = Product(
        name="Yanki",
        description="Chaussure de sport de luxe",
        price=219.99,
        image_url="/image/images7.jpg",
        model_url="/image/beige_cute_sneakers.glb"
    )
    db.session.add(product13)
    product14 = Product(
        name="Yanki Punk ",
        description="Chaussure de soirée  ",
        price=219.99,
        image_url="/image/images8.jpg",
        model_url="/image/classic_high_heel_pumps.glb"
    )
    db.session.add(product14)
    product15 = Product(
        name="Yanki Crocks",
        description="Très relaxant",
        price=219.99,
        image_url="/image/Crocks.jpg",
        model_url="/image/crocs_bae_platform_punk_shoe_in_black.glb"
    )
    db.session.add(product15)
    product16 = Product(
        name="Yanki Coraline",
        description="Botte de luxe",
        price=219.99,
        image_url="/image/images9.jpg",
        model_url="/image/coraline_riding_boot.glb"
    )
    db.session.add(product16)
    product17 = Product(
        name="Yanki leather",
        description="Chaussure de luxe",
        price=219.99,
        image_url="/image/leather.jpg",
        model_url="/image/leather_shoes.glb"
    )
    db.session.add(product17)
    product18 = Product(
        name="Yanki Oxford",
        description="142 très bonne qualité",
        price=219.99,
        image_url="/image/images10.jpg",
        model_url="/image/old_oxford_shoe.glb"
    )
    db.session.add(product18)
    product19 = Product(
        name="Yanki New Balance 990v5",
        description="New Balance 990v5 - Chaussure de sport de luxe",
        price=219.99,
        image_url="/image/NewBalance.jpg",
        model_url="/image/nike_air_zoom_pegasus_36.glb"
    )
    db.session.add(product19)
    product20 = Product(
        name="Yanki New Balance 990v5",
        description="New Balance 990v5 - Chaussure de sport de luxe",
        price=219.99,
        image_url="/image/images11.jpg",
        model_url="/image/sport_shoes.glb"
    )
    db.session.add(product20)
    product21 = Product(
        name="Yanki New Balance 990v5",
        description="New Balance 990v5 - Chaussure de sport de luxe",
        price=219.99,
        image_url="/image/images12.jpg",
        model_url="/image/stella_chunky_high_heel_platform_shoes.glb"
    )
    db.session.add(product20)















    db.session.commit()

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

            create_products()

            clients = create_clients()

            # Ajout des paniers et commandes pour chaque client
            products = Product.query.all()  # Récupère tous les produits
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
