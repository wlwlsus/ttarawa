import os

from mariadb import connect

# DB 연결 정보
DB_HOST = '127.0.0.1'
DB_PORT = 3306
DB_USER = 'root'
DB_PASSWORD = 'root'
DB_NAME = 'ssafy605'

# SQLAlchemy 설정
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = f'mariadb://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

# Flask 앱 설정
SECRET_KEY = os.environ.get('SECRET_KEY') or 'ssafy605-secret-key'


# DB 연결 함수
def get_db_conn():
    conn = connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
    return conn
