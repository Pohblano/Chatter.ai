import enum
from datetime import datetime, timezone
from server import db


class AuthorType(enum.Enum):
    USER = "User"
    AI = "AI"


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    author_type = db.Column(db.Enum(AuthorType), nullable=False)

    conversation_id = db.Column(
        db.Integer, db.ForeignKey("conversation.id"), nullable=False
    )
    conversation = db.relationship(
        "Conversation", backref=db.backref("messages", lazy=True)
    )
