import sqlite3
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
BANCO = BASE_DIR / "banco.db"

ARQUIVO_WEBGIS = (
    BASE_DIR
    / "template"
    / "static"
    / "webgis"
    / "layers"
    / "SetoresCensitriosChefesPretasouParda_2.js"
)

conexao = sqlite3.connect(BANCO)
cursor = conexao.cursor()

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

texto = ARQUIVO_WEBGIS.read_text(encoding="utf-8")

inicio = texto.find("=") + 1
fim = texto.rfind("}")

dados_json = texto[inicio:fim + 1]
dados = json.loads(dados_json)

cursor.execute("DELETE FROM chefia_familia")

quantidade = 0

for feature in dados["features"]:

    propriedades = feature["properties"]

    cd_setor = propriedades.get("CD_SETOR")
    chefes = propriedades.get("Chefes mul")

    if cd_setor is None or chefes is None:
        continue

    try:
        mulheres = int(chefes)
    except (ValueError, TypeError):
        continue

    cursor.execute("""
        INSERT INTO chefia_familia
        (cd_setor, mulheres)
        VALUES (?, ?)
    """, (cd_setor, mulheres))

    quantidade += 1

cursor.execute("DELETE FROM chefia_renda")

dados_renda = [
    ("Até 1 SM", 40.8),
    ("Mais de 1 a 2 SM", 28.0),
    ("Mais de 2 a 3 SM", 17.0),
    ("Mais de 3 SM", 13.0)
]

cursor.executemany("""
    INSERT INTO chefia_renda
    (categoria, percentual)
    VALUES (?, ?)
""", dados_renda)

cursor.execute("DELETE FROM populacao")

dados_populacao = [
    ("Homens", 11880),
    ("Mulheres", 12101)
]

cursor.executemany("""
    INSERT INTO populacao
    (categoria, quantidade)
    VALUES (?, ?)
""", dados_populacao)

cursor.execute("DELETE FROM escolaridade")

dados_escolaridade = [
    ("Indígena", 57, 21),
    ("Parda", 4583, 394),
    ("Amarela", 29, 1),
    ("Preta", 369, 39),
    ("Branca", 3837, 197),
    ("Total", 8875, 652)
]

cursor.executemany("""
    INSERT INTO escolaridade
    (categoria, alfabetizadas, nao_alfabetizadas)
    VALUES (?, ?, ?)
""", dados_escolaridade)

cursor.execute("DELETE FROM cor_raca")

dados_cor_raca = [
    ("Branca", 5182),
    ("Preta", 465),
    ("Amarela", 35),
    ("Parda", 6326),
    ("Indígena", 93)
]

cursor.executemany("""
    INSERT INTO cor_raca
    (categoria, quantidade)
    VALUES (?, ?)
""", dados_cor_raca)

conexao.commit()
conexao.close()

print(f"{quantidade} setores inseridos na tabela chefia_familia.")
print("Dados de renda inseridos com sucesso!")
print("Dados de população inseridos com sucesso!")
print("Dados de escolaridade inseridos com sucesso!")
print("Dados de cor/raça inseridos com sucesso!")
print(f"Banco utilizado: {BANCO}")