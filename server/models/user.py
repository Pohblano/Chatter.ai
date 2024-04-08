from server import db


class User(db.Model):
    phone_number = db.Column(db.String(20), primary_key=True)

    confirmation_code = db.Column(db.String(6), db.ForeignKey("confirmation.code"))
    confirmation = db.relationship(
        "Confirmation", backref=db.backref("user", lazy=True)
    )
