# backend/app.py
import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

from extensions import db, migrate, mail
from flask_jwt_extended import JWTManager

from auth     import auth_bp
from products import products_bp
from order    import order_bp
from cart     import cart_bp

load_dotenv()

def create_app():
    app = Flask(__name__)

    # CORS
    CORS(app, origins=["http://localhost:5173"])

    # Config
    app.config['SQLALCHEMY_DATABASE_URI']        = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY']                  = os.getenv("JWT_SECRET_KEY")

    # Mail
    app.config.update(
        MAIL_SERVER        = os.getenv("MAIL_SERVER"),
        MAIL_PORT          = int(os.getenv("MAIL_PORT", 587)),
        MAIL_USERNAME      = os.getenv("MAIL_USERNAME"),
        MAIL_PASSWORD      = os.getenv("MAIL_PASSWORD"),
        MAIL_USE_TLS       = os.getenv("MAIL_USE_TLS", "True") == "True",
        MAIL_USE_SSL       = os.getenv("MAIL_USE_SSL", "False") == "True",
        MAIL_DEFAULT_SENDER= os.getenv("MAIL_DEFAULT_SENDER"),
    )

    # Init
    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    JWTManager(app)

    # Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(products_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(cart_bp)

    # Test Route
    @app.route("/ping")
    def ping():
        return "🚀 API OK", 200

    # Serve Images Route
    @app.route('/image/<path:filename>')
    def serve_image(filename):
        # Chemin sécurisé
        return send_from_directory(os.path.join(app.root_path, 'static/image'), filename)

    return app

# pour flask run / flask db
app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
