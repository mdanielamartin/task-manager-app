from extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(256), nullable=False)

    tasks = db.relationship("Task",back_populates = "user",  cascade="all, delete-orphan")

    def show_id(self):
        return str(self.id)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey("user.id"),nullable=False)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    status = db.Column(db.Boolean(),nullable=True, default=False)

    user = db.relationship("User",back_populates = "tasks")

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)

    def serialize(self):
        return {

            "id":self.id,
            "name":self.name,
            "description":self.description,
            "status":self.status
        }
