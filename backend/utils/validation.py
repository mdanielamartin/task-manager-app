from marshmallow import Schema, fields, validates, ValidationError
from marshmallow.validate import Length, Range



class UserSchema(Schema):
    email =  fields.Email(required=True, validate=Length(min=5, max=50))
    password = fields.Str(required=True, validate=Length(min=8, max=20))

class TaskSchema(Schema):
    id =  fields.Int(required=False, allow_none=True)
    name = fields.Str(required=True, validate=Length(min=1, max=80))
    description = fields.Str(required=False, validate=Length(min=0, max=500), allow_none=True)
    status = fields.Bool(required=False)
