
from flask import Blueprint, jsonify
from .extensions import db
from .models import User




user = Blueprint("user", __name__)
task = Blueprint("task", __name__)

@user.route("/", methods=["GET"])
def say_hello():
    try:
        return jsonify("Hello"), 200
    except Exception as e:
        return jsonify(e),500

@user.route("/", methods=["POST"])
def add_user():
    try:
        new_user = User(email="something",password="something")
        db.session.add(new_user)
        db.session.commit()
        just_added = User.query.filter_by(email="something").first()
        return jsonify(just_added.show_id()), 200
    except Exception as e:
        return jsonify({"error":str(e)}),500
