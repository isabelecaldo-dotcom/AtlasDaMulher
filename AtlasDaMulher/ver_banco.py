import sqlite3

conexao = sqlite3.connect("banco.db")
cursor = conexao.cursor()

cursor.execute("""
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
    ORDER BY name
""")

tabelas = cursor.fetchall()

print("\nTABELAS DO BANCO:\n")

for tabela in tabelas:
    print("-", tabela[0])

conexao.close()