import os
from flask import Flask
from .extensions import db
from .config import Config
from .routes import user
from .routes import task
from dotenv import load_dotenv

load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET_KEY")

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["JWT_SECRET_KEY"] = "secreket"
    db.init_app(app)
    app.register_blueprint(user, url_prefix="/user")
    app.register_blueprint(task, url_prefix="/task")
    with app.app_context():
        db.create_all()
    return app
