import os
from dotenv import load_dotenv
from . import create_app
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .extensions import db

load_dotenv()


app = create_app()
migrate = Migrate(app, db)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)  # Runs the server in debug mode for development
