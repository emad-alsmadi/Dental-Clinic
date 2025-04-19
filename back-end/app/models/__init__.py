from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 
from flask_session import Session 
from config import Config

db = SQLAlchemy() 
session = Session()
def create_app(): 
    app = Flask(__name__) 
    app.config.from_object(Config)
    # إعداد 
    CORS (app, supports_credentials=True, origins=["http://localhost:3000"]) 
    # ربط الامتدادات 
    db.init_app(app)
    session.init_app(app) 
    # استيراد SQLAlchemy النماذج لتسجيلها مع 
    from app.models import user, admin, doctor, booking 
    # تسجيل المسارات 
    from app.routes.auth_routes import auth_bp 
    from app.routes.booking_routes import booking_bp 
    from app.routes.doctor_routes import doctor_bp 
    
    app.register_blueprint(auth_bp, url_prefix="/api") 
    app.register_blueprint(booking_bp, url_prefix="/api") 
    app.register_blueprint(doctor_bp, url_prefix="/api") 
    
    # إنشاء الجداول تلقائيًا 
    with app.app_context(): db.create_all() 
    return app