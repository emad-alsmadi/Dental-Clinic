from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session  # <-- إضافة Flask-Session
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, time

app = Flask(__name__)
# <-- تمكين credentials
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# إعدادات قاعدة البيانات
# قاعدة بيانات المستخدم والحجوزات
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///clinic.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)


# ⬅⬅ تخزين الجلسات في قاعدة البيانات بدلاً من الملفات
app.config['SESSION_TYPE'] = 'sqlalchemy'

app.config['SESSION_SQLALCHEMY'] = db  # ⬅⬅ استخدام SQLAlchemy لحفظ الجلسات
app.config['SESSION_USE_SIGNER'] = True  # ⬅⬅ تشفير بيانات الجلسة لحماية أفضل
app.config['SESSION_PERMANENT'] = True
Session(app)  # <-- تهيئة الجلسات
# ---- النماذج ----


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)  # <-- إضافة حقل يحدد إن كان المستخدم أدمن أم لا

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    user = db.relationship('User', backref=db.backref('admin', uselist=False))

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    time = db.Column(db.String(5), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    speciality = db.Column(db.String(100), nullable=False)
    doctor = db.Column(db.String(100), nullable=False)


# إنشاء الجداول عند تشغيل التطبيق
with app.app_context():
    db.create_all()

    #إنشاء ادمن افتراضي عند تشغيل التطبيق لأول مرة
    if not User.query.filter_by(email="admin@gmail.com").first():
        hashed_password = generate_password_hash("qqqqqqqq", method='pbkdf2:sha256')
        admin_user = User(email="admin@gmail.com", password=hashed_password, is_admin=True)
        db.session.add(admin_user)
        db.session.commit()

        admin_account = Admin(user_id=admin_user.id)
        db.session.add(admin_account)
        db.session.commit()
# ---- نقاط API ----


# ✅ تسجيل دخول الأدمن
@app.route('/api/login-admin', methods=['POST'])
def login_admin():
    data = request.get_json()
    user = User.query.filter_by(email=data.get("email")).first()

    # التحقق من صحة بيانات الأدمن
    if user and user.is_admin and check_password_hash(user.password, data.get("password")):
        session['id'] = user.id
        session['email'] = user.email
        session['is_admin'] = True # تخزين حالة الأدمن في الجلسة
        session.modified = True

        return jsonify({
            "message": "تم تسجيل الدخول كأدمن بنجاح!",
            "isAdmin": True,
            "user": {
                "id": user.id,
                "email": user.email
            }
        }), 200

    return jsonify({"error": "بيانات تسجيل الدخول غير صحيحة"}), 401

#  التحقق من ان الأدمن مسجل دخول او لا
@app.route('/api/check-admin', methods=['GET'])
def check_admin():
    is_admin = session.get('is_admin', False)
    return jsonify({'isAdmin': is_admin}), 200

# ✅ تسجيل مستخدم جديد
# ✅ وتسجيل الدخول تلقائيًا


@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'يرجى إدخال البريد الإلكتروني وكلمة المرور'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'البريد الإلكتروني مستخدم بالفعل'}), 400

    hashed_password = generate_password_hash(
        data['password'], method='pbkdf2:sha256')
    new_user = User(email=data['email'], password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    # ✅ تسجيل الدخول تلقائيًا
    session['id'] = new_user.id
    session['email'] = new_user.email
    session.modified = True
    print("'message': 'تم التسجيل بنجاح!' \n", data)
    return jsonify({
        'message': 'تم التسجيل وتسجيل الدخول بنجاح!',
        'user': {
            'id': new_user.id,
            'email': new_user.email
        }
    }), 201


# ✅ check-register
# ✅تحقق من التسجيل

@app.route('/api/check-register', methods=['GET'])
def check_register():
    email = request.args.get('email')

    if not email:
        return jsonify({'error': 'يرجى إدخال البريد الإلكتروني'}), 400

    user = User.query.filter_by(email=email).first()

    return jsonify({"registered": bool(user)}), 200



# تسجيل الدحول
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    user = User.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password, data['password']):
        session['id'] = user.id  # <-- تخزين معرف المستخدم في الجلسة
        session['email'] = user.email
        session.modified = True   # تحديث الجلسة للتأكد من تخزينها
        print("جلسة تسجيل الدخول", session)
        return jsonify({
            'message': 'تم تسجيل الدخول بنجاح!',
            'user': {
                'id': user.id,
                'email': user.email
            }
        }), 200

    return jsonify({'error': 'عذراً، لم يتم العثور على حساب بهذا البريد الإلكتروني. \n يرجى انشاء حساب جديد '}), 401

# ✅تحقق من تسجيل الدخول
@app.route('/api/check-login', methods=['GET'])
def check_login():
    id = session.get('id')
    email = session.get('email')
    if id:
        return jsonify({
            'isLoggedIn': True,
            'user': {
                'id': id,
                'email': email,
            }
        }), 200
    else:
        return jsonify({'isLoggedIn': False}), 200

# ✅ تسجيل الخروج
@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('id', None)
    session.pop('email', None)
    session.pop('is_admin', None)
    session.modified = True
    session.clear()
    db.session.commit()  # حفظ التغييرات في قاعدة البيانات
    
    return jsonify({'message': 'تم تسجيل الخروج بنجاح'}), 200



# ✅ إنشاء حجز جديد
@app.route('/api/bookings', methods=['POST'])
def create_booking():
    data = request.get_json()
    if 'id' not in session:
        return jsonify({'error': ' غير مصرح به يرجى تسجبل الدخول اولا'}), 401

    required_fields = ['name', 'email', 'date','time', 'address', 'speciality', 'doctor']

    if not all(field in data for field in required_fields):
        return jsonify({'error': 'يرجى ملء جميع الحقول'}), 400


    # التحقق من وجود حجز بنفس الموعد لنفس المستخدم  
    existing_booking = Booking.query.filter_by(  
        user_id=session['id'], 
        date=data['date'],  
        time=data['time']  
    ).first()  

    if existing_booking:  
        return jsonify({'error': 'لديك بالفعل حجز في هذا الموعد'}), 409  

    new_booking = Booking(
        user_id=session['id'],  # <-- ربط الحجز بالمستخدم المسجل
        name=data['name'],
        email=data['email'],
        date=data['date'],
        time=data['time'],
        address=data['address'],
        speciality=data['speciality'],
        doctor=data['doctor']
    )

    db.session.add(new_booking)
    db.session.commit()

    return jsonify({'message': 'تم إنشاء الحجز بنجاح!'}), 201



# ✅ جلب جميع الحجوزات

@app.route('/api/get-bookings', methods=['GET'])
def get_bookings():
    if 'id' not in session and not session.get('is_admin',False):
        return jsonify({'error': 'غير مصرح به يرجى تسجيل الدخول أولًا'}), 401

    user = User.query.get(session['id'])

    if user and user.is_admin:
        bookings = Booking.query.all()  # جلب كل الحجوزات إذا كان المستخدم أدمن
    else:
        bookings = Booking.query.filter_by(user_id=user.id).all()  # جلب حجوزات المستخدم فقط

    return jsonify([{
        'id': booking.id,
        'name': booking.name,
        'email': booking.email,
        'date': booking.date,
        'time': booking.time,
        'address': booking.address,
        'speciality': booking.speciality,
        'doctor': booking.doctor
    } for booking in bookings]), 200



# ✅ حذف حجز

@app.route('/api/get-bookings/<int:booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    if 'id' not in session:
        return jsonify({'error': 'غير مصرح به يرجى تسجيل الدخول اولا'}), 401

    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({'error': 'الحجز غير موجود'}), 404

    # if booking.user_id != session['user_id'] and not session.get('is_admin'):
    #     return jsonify({'error': 'غير مصرح به ليس لديك صلاحبات للحذف '}), 403

    db.session.delete(booking)
    db.session.commit()
    return jsonify({'message': 'تم حذف الحجز بنجاح'}), 200

# ✅ جلب جميع المرضى

@app.route('/api/get-patients', methods=['GET'])
def get_patients():
    # التأكد من أن المستخدم أدمن
    if not session.get('is_admin', False):
        return jsonify({'error': 'غير مصرح به، انت لست مديرًا'}), 401

    # جلب جميع المستخدمين الذين ليسوا إداريين
    users = User.query.filter_by(is_admin=False).all()

    return jsonify([
        {'id': user.id, 'email': user.email}
        for user in users
    ]), 200
# دالة لحذف المستخدم نهائيًا
@app.route('/api/delete-patient/<int:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    if not session.get('is_admin', False):
        return jsonify({'error': 'غير مصرح به، انت لست مديرًا'}), 401

    account_patients = User.query.filter_by(is_admin=False).all()
    try:
        db.session.delete(account_patients[patient_id])
        db.session.commit()
        session.modified = True
        return jsonify({"message": "تم حذف المستخدم بنجاح"}), 200
    
    except Exception as e:
        return jsonify({"error": "حدث خطأ أثناء الحذف"}), 500

# ✅ تشغيل التطبيق
if __name__ == '__main__':
    app.run(debug=True)
