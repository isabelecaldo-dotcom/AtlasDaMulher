import sqlite3

conexao = sqlite3.connect("banco.db")
import sqlite3
import json
from pathlib import Path

BANCO = Path(__file__).parent / "banco.db"

ARQUIVO_WEBGIS = (
    Path(__file__).parent
    / "template"
    / "static"
    / "webgis"
    / "layers"
    / "SetoresCensitriosChefesPretasouParda_2.js"
)

texto = ARQUIVO_WEBGIS.read_text(encoding="utf-8")

inicio = texto.find("=") + 1
fim = texto.rfind("}")

dados_json = texto[inicio:fim + 1]

dados = json.loads(dados_json)

conexao = sqlite3.connect(BANCO)
cursor = conexao.cursor()

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

conexao.commit()
conexao.close()

print(f"{quantidade} setores inseridos")