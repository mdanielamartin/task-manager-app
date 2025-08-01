from api import create_app
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .extensions import db


app = create_app()
migrate = Migrate(app, db)


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)  # Runs the server in debug mode for development
