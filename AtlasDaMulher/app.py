from flask import Flask, render_template, jsonify
import sqlite3
from pathlib import Path

app = Flask(__name__)

BANCO = Path(__file__).resolve().parent.parent / "banco.db"


def conectar_banco():
    conexao = sqlite3.connect(BANCO)
    conexao.row_factory = sqlite3.Row
    return conexao


@app.route("/")
def inicio():
    return render_template("index.html")


@app.route("/api/chefia-familia")
def chefia_familia():

    conexao = conectar_banco()

    dados = conexao.execute("""
        SELECT cd_setor, mulheres
        FROM chefia_familia
    """).fetchall()

    conexao.close()

    resultado = []

    for dado in dados:
        resultado.append({
            "cd_setor": dado["cd_setor"],
            "mulheres": dado["mulheres"]
        })

    return jsonify(resultado)


if __name__ == "__main__":
    app.run(debug=True)