from models.user import User, db
from flask import session
from werkzeug.security import check_password_hash
from sqlalchemy.exc import IntegrityError

def register_user(name, email, password):
    if User.query.filter_by(email=email).first():
        return {'error': 'البريد الإلكتروني مستخدم بالفعل'}, 400

    new_user = User(name=name, email=email, password=password)

    try:
        db.session.add(new_user)
        db.session.commit()

        # تسجيل الدخول تلقائيًا بعد التسجيل
        session['id'] = new_user.id
        session['email'] = new_user.email
        session['role'] = new_user.role
        session.modified = True

        return {'message': 'تم التسجيل وتسجيل الدخول بنجاح!', 'user': new_user.to_dict()}, 201

    except IntegrityError:
        db.session.rollback()
        return {'error': 'حدث خطأ أثناء التسجيل'}, 500


def login_user(email, password):
    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        session['id'] = user.id
        session['email'] = user.email
        session['role'] = user.role
        session.modified = True

        return {'message': 'تم تسجيل الدخول بنجاح!', 'user': user.to_dict()}, 200

    return {'error': 'بيانات الدخول غير صحيحة'}, 401


def logout_user():
    session.pop('id', None)
    session.pop('email', None)
    session.pop('role', None)
    session.clear()
    session.modified = True

    return {'message': 'تم تسجيل الخروج بنجاح'}, 200


def check_logged_in():
    if 'id' in session:
        return {'isLoggedIn': True, 'user': {'id': session['id'], 'email': session['email'], 'role': session.get('role')}}, 200
    return {'isLoggedIn': False}, 200