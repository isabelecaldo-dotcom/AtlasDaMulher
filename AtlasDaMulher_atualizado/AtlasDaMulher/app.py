from flask import Flask, render_template, jsonify

import sqlite3
from pathlib import Path
import plotly.graph_objects as go
import plotly.io as pio


app = Flask(
    __name__,
    template_folder="template/templates",
    static_folder="template/static"
)

BANCO = Path(__file__).resolve().parent / "banco.db"


def conectar_banco():
    conexao = sqlite3.connect(BANCO)
    conexao.row_factory = sqlite3.Row
    return conexao

def criar_grafico_populacao():

    conexao = sqlite3.connect(BANCO)
    cursor = conexao.cursor()

    cursor.execute("""
        SELECT categoria, quantidade
        FROM populacao
        ORDER BY id
    """)

    dados = cursor.fetchall()
    conexao.close()

    categorias = [linha[0] for linha in dados]
    valores = [linha[1] for linha in dados]

    fig = go.Figure()

    fig.add_trace(
        go.Bar(
            x=valores,
            y=categorias,
            orientation="h",
            marker_color="#6F22B5",
            width=0.45,
            hovertemplate="%{x:.0f} pessoas<extra></extra>"
        )
    )

    fig.update_layout(
        title={
            "text": "Homens x Mulheres em Jardim",
            "x": 0.5,
            "xanchor": "center",
            "font": {
                "size": 22,
                "color": "#5B29A5"
            }
            
        },
        xaxis_title="Quantidade de pessoas",
        yaxis_title="Sexo",

        xaxis=dict(
            range=[0, 14000]
        ),

        template="simple_white",

        height=500,
        width=900,

        margin=dict(
            l=150,
            r=90,
            t=80,
            b=80
        ),

        dragmode=False
    )

    return pio.to_html(
        fig,
        full_html=False,
        include_plotlyjs="cdn",
        config={
            "staticPlot": False,
            "displayModeBar": False,
            "scrollZoom": False,
            "responsive": True
}
    )

def criar_grafico_raca():

    conexao = sqlite3.connect(BANCO)
    cursor = conexao.cursor()

    cursor.execute("""
        SELECT categoria, quantidade
        FROM cor_raca
        ORDER BY
            CASE categoria
                WHEN 'Parda' THEN 1
                WHEN 'Branca' THEN 2
                WHEN 'Preta' THEN 3
                WHEN 'Amarela' THEN 4
                WHEN 'Indígena' THEN 5
            END
    """)

    dados = cursor.fetchall()
    conexao.close()

    categorias = [linha[0] for linha in dados]
    valores = [linha[1] for linha in dados]

    fig = go.Figure()

    fig.add_trace(
        go.Bar(
            x=valores,
            y=categorias,
            orientation="h",
            marker_color="#6F22B5"
        )
    )

    fig.update_layout(
        title={
            "text": "Mulheres Por Cor ou Raça",
            "x": 0.5,
            "xanchor": "center",
            "font": {
                "size": 22,
                "color": "#5B29A5"
            }
        },

        xaxis_title="Quantidade de mulheres",
        yaxis_title="Cor ou raça",

        template="simple_white",

        height=550,
        width=900,

        margin=dict(
            l=100,
            r=80,
            t=80,
            b=80
        ),

        dragmode=False
    )

    return pio.to_html(
        fig,
        full_html=False,
        include_plotlyjs=False,
        config={
            "staticPlot": False,
            "displayModeBar": False,
            "scrollZoom": False
        }
    )

def criar_grafico_chefia():

    conexao = conectar_banco()

    dados = conexao.execute("""
        SELECT categoria, percentual
        FROM chefia_renda
    """).fetchall()

    conexao.close()

    categorias = [dado["categoria"] for dado in dados]
    valores = [dado["percentual"] for dado in dados]

    fig = go.Figure()

    fig.add_trace(
        go.Bar(
            x=valores,
            y=categorias,
            orientation="h",
            marker_color="#8547B8",
            hovertemplate="<b>%{y}</b><br>Percentual: %{x}%<extra></extra>"
        )
    )

    fig.update_layout(

        title={
            "text": "Renda de Mulheres",
            "x": 0.4,
            "xanchor": "left",
            "font": {
                "size": 22,
                "color": "#5B29A5"
            }
        },

        xaxis_title="Percentual (%)",
        yaxis_title="Faixa de renda",

        template="simple_white",

        height=550,
        width=800,

        margin=dict(
            l=120,
            r=120,
            t=110,
            b=150
        ),

        plot_bgcolor="white",
        paper_bgcolor="white",

        dragmode=False
    )

    return pio.to_html(
        fig,
        full_html=False,
        include_plotlyjs="cdn",
        config={
            "staticPlot": False,
            "displayModeBar": False,
            "scrollZoom": False
        }
    )

def criar_grafico_escolaridade():

    conexao = sqlite3.connect(BANCO)
    cursor = conexao.cursor()

    cursor.execute("""
        SELECT categoria, alfabetizadas, nao_alfabetizadas
        FROM escolaridade
        ORDER BY id
    """)

    dados = cursor.fetchall()
    conexao.close()

    categorias = [linha[0] for linha in dados]
    alfabetizadas = [linha[1] for linha in dados]
    nao_alfabetizadas = [linha[2] for linha in dados]
    fig = go.Figure()

    fig.add_trace(
    go.Bar(
        x=alfabetizadas,
        y=categorias,
        orientation="h",
        name="Alfabetizadas",

        marker=dict(
            color="#6F4EB5",
            line=dict(
                color="#5B3975",
            )
        ),

        hovertemplate="%{x:.0f} pessoas<extra></extra>",

        width=0.80
        )
    )

    fig.add_trace(
    go.Bar(
        x=nao_alfabetizadas,
        y=categorias,
        orientation="h",
        name="Não alfabetizadas",

        marker=dict(
            color="#A993D0",
            line=dict(
                color="#8069A8",

            )
        ),

        hovertemplate="%{x:.0f} pessoas<extra></extra>",

        width=0.80
        )
    )

    fig.update_layout(

        title={
            "text": "% de mulheres com 18 anos alfabetizadas por cor ou raça ",
            "x": 0.5,
            "xanchor": "center",
            "font": {
                "size": 26,
                "color": "#6547A8"
            }
        },

        barmode="group",

        xaxis={
            "range": [0, 10000],
            "dtick": 2500,
            "showgrid": True,
            "gridcolor": "#D0D0D0",
            "zeroline": False,
            "title": ""
        },

        yaxis={
            "title": {
                "text": "Cor/Raça",
                "font": {
                    "size": 16,
                    "color": "#8060B5"
                }
            },
            "autorange": "reversed"
        },

        legend={
            "orientation": "h",
            "x": 0.5,
            "xanchor": "center",
            "y": -0.18
        },

        template="simple_white",

        height=600,
        width=1100,

        margin=dict(
            l=100,
            r=80,
            t=90,
            b=80
        ),

        plot_bgcolor="white",
        paper_bgcolor="white",

        dragmode=False,

        bargap=1,
        bargroupgap=0.10,
    )

    return pio.to_html(
        fig,
        full_html=False,
        include_plotlyjs="cdn",
        config={
            "staticPlot": False,
            "displayModeBar": False,
            "scrollZoom": False
        }
    )

@app.route("/")
def inicio():

    grafico_chefia = criar_grafico_chefia()

    grafico_escolaridade = criar_grafico_escolaridade()

    grafico_populacao = criar_grafico_populacao()

    grafico_raca = criar_grafico_raca()

    return render_template(
        "index.html",
        grafico_chefia=grafico_chefia,
        grafico_escolaridade=grafico_escolaridade,
        grafico_populacao=grafico_populacao,
        grafico_raca=grafico_raca
    )

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