class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///clinic.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your_secret_key'
    SESSION_TYPE = 'sqlalchemy'
    SESSION_PERMANENT = True
    SESSION_USE_SIGNER = True