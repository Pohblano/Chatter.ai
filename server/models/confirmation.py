from server import db


class Confirmation(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    code = db.Column(db.String(6), nullable=False)
