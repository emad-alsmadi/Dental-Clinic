from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session

db = SQLAlchemy()
session = Session()

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    db.init_app(app)
    session.init_app(app)
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    with app.app_context():
        from .models import user, doctor, booking, admin
        db.create_all()

        # تسجيل أدمن تلقائي
        from .services.auth_service import create_default_admin
        create_default_admin()

        # تسجيل المسارات
        from .routes import auth_routes, booking_routes, doctor_routes
        app.register_blueprint(auth_routes.bp)
        app.register_blueprint(booking_routes.bp)
        app.register_blueprint(doctor_routes.bp)

    return app