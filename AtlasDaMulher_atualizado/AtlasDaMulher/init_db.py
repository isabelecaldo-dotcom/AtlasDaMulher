import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
BANCO = BASE_DIR / "banco.db"

conexao = sqlite3.connect(BANCO)
cursor = conexao.cursor()

cursor.execute("DROP TABLE IF EXISTS mapa_analfabetismo")
cursor.execute("DROP TABLE IF EXISTS mapa_conjuge_filhos")

cursor.execute("""
CREATE TABLE IF NOT EXISTS chefia_familia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cd_setor TEXT NOT NULL,
    mulheres INTEGER NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS chefia_renda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT NOT NULL,
    percentual REAL NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS populacao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT NOT NULL,
    quantidade INTEGER NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS escolaridade (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT NOT NULL,
    alfabetizadas INTEGER NOT NULL,
    nao_alfabetizadas INTEGER NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS cor_raca (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT NOT NULL,
    quantidade INTEGER NOT NULL
)
""")

conexao.commit()
conexao.close()


print("Banco de dados inicializado com sucesso!")
print(f"Banco utilizado: {BANCO}")