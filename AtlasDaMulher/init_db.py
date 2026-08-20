import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
BANCO = BASE_DIR / "banco.db"


conexao = sqlite3.connect(BANCO)
cursor = conexao.cursor()


cursor.execute("""
CREATE TABLE IF NOT EXISTS chefia_familia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cd_setor TEXT NOT NULL,
    mulheres INTEGER NOT NULL
)
""")


conexao.commit()
conexao.close()


print("Tabela chefia_familia criada ")
print(f"Banco utilizado: {BANCO}")