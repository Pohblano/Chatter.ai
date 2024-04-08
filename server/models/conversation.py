from server import db


class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    ai_id = db.Column(db.Integer, db.ForeignKey("ai.id"), nullable=False)
    ai = db.relationship("AI")

    user_phone_number = db.Column(
        db.String(20), db.ForeignKey("user.phone_number"), nullable=False
    )
    user = db.relationship("User", backref=db.backref("conversations", lazy=True))
