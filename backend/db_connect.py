import os
import pymysql
import pymysql.cursors
from urllib.parse import urlparse
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    # Analisa a URL do .env
    db_url = os.getenv("DATABASE_URL")
    parsed = urlparse(db_url)

    connection = pymysql.connect(   
        host=parsed.hostname,
        user=parsed.username,
        password=parsed.password,
        database=parsed.path[1:],
        port=parsed.port or 3306,
        cursorclass=pymysql.cursors.DictCursor # Retorna dados como Dicionário/JSON
    )
    
    try:
        yield connection
    finally:
        connection.close()