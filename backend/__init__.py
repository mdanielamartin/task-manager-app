import os
from flask import Flask
from .extensions import db,jwt
from .config import Config
from .routes import user
from .routes import task, base
from dotenv import load_dotenv

from flask_cors import CORS

load_dotenv()
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY","keyfordevelopment")
FRONTEND_URL = os.getenv("FRONTEND_URL")
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_ACCESS_COOKIE_NAME"] = "access_token_cookie"
    app.config["JWT_COOKIE_SAMESITE"] = "None"  # or "Lax" depending on your needs
    app.config["JWT_COOKIE_SECURE"] = True
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False
    jwt.init_app(app)
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    db.init_app(app)
    app.register_blueprint(user, url_prefix="/user")
    app.register_blueprint(task, url_prefix="/task")
    app.register_blueprint(base, url_prefix="/")
    with app.app_context():
        db.create_all()
    return app
