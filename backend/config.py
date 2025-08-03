import os
import dotenv

DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://mdmpereira:nina@localhost:5432/taskmg")
class Config:
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TEMPLATES_AUTO_RELOAD = True
