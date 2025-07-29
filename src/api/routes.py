
import bcrypt

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt, verify_jwt_in_request, set_access_cookies, unset_jwt_cookies
from jwt.exceptions import ExpiredSignatureError
from marshmallow import ValidationError
from .utils.validation import UserSchema, TaskSchema
from .utils.user_utils import check_user
from .extensions import db
from .models import User, Task
from datetime import timedelta




user = Blueprint("user", __name__)
task = Blueprint("task", __name__)

@user.route("/", methods=["GET"])
def say_hello():
    try:
        return jsonify("Hello"), 200
    except Exception as e:
        return jsonify(e),500

@user.route("/signup", methods=["POST"])
def add_new_user():
    data = request.json
    user_schema = UserSchema()
    try:
        validated_data = user_schema.load(data)
        if User.query.filter_by(email=validated_data['email']).first():
            return jsonify("Email already in use"), 409
    except ValidationError as e:
        return jsonify({e.messages}), 400
    try:
        hashed_password = bcrypt.hashpw(validated_data['password'].encode('utf-8'), bcrypt.gensalt())
        new_user = User(email=validated_data['email'], password=hashed_password.decode('utf-8'))
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=str(new_user.id),additional_claims={"email": new_user.email}, expires_delta=timedelta(hours=1))
        resp = jsonify({'login': True})
        set_access_cookies(resp, access_token)
        return resp, 200
    except Exception as e:
        return jsonify(str(e)), 500


@user.route("/login", methods=["POST"])
def login_user():
    data = request.json
    user_schema = UserSchema()
    try:
        validated_data = user_schema.load(data)
        if not User.query.filter_by(email=validated_data['email']).first():
            return jsonify("Account not found, registration required"), 404
    except ValidationError as e:
        return jsonify(e.messages), 400
    try:
        user = User.query.filter_by(email=validated_data['email']).first()
        verify_password = bcrypt.checkpw(validated_data['password'].encode('utf-8'), user.password.encode('utf-8'))
        if not verify_password:
            return jsonify("Invalid email/password combination"), 401
        access_token = create_access_token(identity=str(user.id),additional_claims={"email": user.email}, expires_delta=timedelta(hours=1))
        resp = jsonify({'login': True})
        set_access_cookies(resp, access_token)
        return resp, 200
    except Exception as e:
        return jsonify(str(e)), 500

@user.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "Logout successful"})
    unset_jwt_cookies(response)
    return response


@task.route("/add", methods=["POST"])
@jwt_required()
def add_task():
    user_id = get_jwt_identity()
    auth = check_user(user_id)
    if not auth:
        return jsonify("User not found"), 404
    try:
        data = request.json
        task_schema = TaskSchema()
        validated_data = task_schema.load(data)
        validated_data["user_id"] = user_id
    except ValidationError as e:
        return jsonify(e.messages), 400
    try:
        task = Task(**validated_data)
        db.session.add(task)
        db.session.commit()
        return jsonify(task.serialize()), 200
    except Exception as e:
        return jsonify(str(e)), 500

@task.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_task(id):
    user_id = get_jwt_identity()
    auth = check_user(user_id)
    if not auth:
        return jsonify("User not found"), 404
    try:
        data = request.json
        task_schema = TaskSchema()
        validated_data = task_schema.load(data)
    except ValidationError as e:
        return jsonify(e.messages), 400
    try:
        task = Task.query.filter_by(id=id,user_id=user_id).first()
        if not task:
            return jsonify("Task not found"), 404
        for key,value in validated_data.items():
            if hasattr(task,key):
                setattr(task,key,value)
        db.session.commit()
        return jsonify(task.serialize()), 200
    except Exception as e:
        return jsonify(str(e)), 500

@task.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):
    user_id = get_jwt_identity()
    auth = check_user(user_id)
    if not auth:
        return jsonify("User not found"), 404
    try:
        task = Task.query.filter_by(id=id,user_id=user_id).first()
        if not task:
            return jsonify("Poll not found"), 404
        db.session.delete(task)
        db.session.commit()
        return jsonify(f"Poll {id} deleted"), 200
    except Exception as e:
        return jsonify({"error":str(e)}), 500

@task.route("/all", methods=["GET"])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    auth = check_user(user_id)
    if not auth:
        return jsonify("User not found"), 404
    try:
        tasks = Task.query.filter_by(user_id=user_id).all()
        task_list = [task.serialize() for task in tasks]
        return jsonify(task_list), 200
    except Exception as e:
        return jsonify(str(e)), 500


@task.route("/done", methods=["PUT"])
@jwt_required()
def mark_task_as_done():
    user_id = get_jwt_identity()
    auth = check_user(user_id)
    if not auth:
        return jsonify("User not found"), 404

    try:
        data = request.get_json()
        if not isinstance(data, list) or not all(isinstance(id, int) for id in data):
            return jsonify("Expected a list of IDs"), 400

        for id in data:
            exists = Task.query.filter_by(user_id=user_id, id=id).first()
            if exists:
                exists.status = True
        db.session.commit()
        return jsonify("Tasks marked as done"), 200
    except Exception as e:
        return jsonify(str(e)), 500

@task.route("/incomplete", methods=["PUT"])
@jwt_required()
def mark_task_as_incomplete():
    user_id = get_jwt_identity()
    auth = check_user(user_id)
    if not auth:
        return jsonify("User not found"), 404

    try:
        data = request.get_json()
        if not isinstance(data, list) or not all(isinstance(id, int) for id in data):
            return jsonify("Expected a list of IDs"), 400

        for id in data:
            exists = Task.query.filter_by(user_id=user_id, id=id).first()
            if exists:
                exists.status = False
        db.session.commit()
        return jsonify("Tasks marked as incomplete"), 200
    except Exception as e:
        return jsonify(str(e)), 500
