import os
class Config:
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "postgresql://mdmpereira:nina@db:5432/taskmg"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TEMPLATES_AUTO_RELOAD = True
