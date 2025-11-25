from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from db_connect import get_db_connection
from pymysql import Connection

app = FastAPI(title="Sinan Dengue API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API Dengue Online - Retorno em JSON"}


@app.get("/auditoria-exames")
def auditoria_exames(db: Connection = Depends(get_db_connection)):
    sql = """
        SELECT e.nomeExame, COUNT(r.fkIdNotificacao) AS Qtd_Realizada
        FROM exame e
        LEFT JOIN realiza r ON e.idExame = r.fkIdExame
        GROUP BY e.nomeExame;
    """
    with db.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall() # Retorna JSON Array

@app.get("/pacientes-hospitalizados")
def pacientes_hospitalizados(db: Connection = Depends(get_db_connection)):
    sql = """
        SELECT p.idPaciente, p.sexo, m.nomeMunicipio AS Municipio_Residencia,
               n.dataSintoma, n.hospitalizacao
        FROM paciente p
        JOIN notificacao n ON p.idPaciente = n.fkIdPaciente
        JOIN municipio m ON p.fkIdMunicipio = m.idMunicipio
        WHERE n.hospitalizacao = '1';
    """
    with db.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall()

@app.get("/evolucao-por-sexo")
def evolucao_por_sexo(db: Connection = Depends(get_db_connection)):
    sql = """
        SELECT p.sexo, n.evolucao, COUNT(n.idNotificacao) AS Quantidade
        FROM paciente p
        JOIN notificacao n ON p.idPaciente = n.fkIdPaciente
        JOIN municipio m ON n.fkIdMunicipio = m.idMunicipio
        GROUP BY p.sexo, n.evolucao;
    """
    with db.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall()

@app.get("/hospitalizacoes-municipio")
def hospitalizacoes_municipio(db: Connection = Depends(get_db_connection)):
    sql = """
        SELECT m.nomeMunicipio, m.siglaUF, COUNT(n.idNotificacao) AS Total_Casos,
               SUM(CASE WHEN n.hospitalizacao = '1' THEN 1 ELSE 0 END) AS Total_Hospitalizacoes
        FROM municipio m
        JOIN notificacao n ON m.idMunicipio = n.fkIdMunicipio
        GROUP BY m.nomeMunicipio, m.siglaUF
        ORDER BY Total_Casos DESC;
    """
    with db.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall()

@app.get("/municipios-alerta")
def municipios_alerta(db: Connection = Depends(get_db_connection)):
    sql = """
        SELECT m.nomeMunicipio, m.siglaUF
        FROM municipio m
        WHERE m.idMunicipio IN (
            SELECT fkIdMunicipio FROM notificacao 
            GROUP BY fkIdMunicipio HAVING COUNT(idNotificacao) > 50
        );
    """
    with db.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall()

@app.get("/curva-epidemiologica")
def curva_epidemiologica(db: Connection = Depends(get_db_connection)):
    sql = """
        SELECT 
            DATE_FORMAT(n.dataSintoma, '%Y-%m') AS Periodo,
            COUNT(n.idNotificacao) AS Total_Casos
        FROM notificacao n
        WHERE n.dataSintoma IS NOT NULL
        GROUP BY Periodo
        ORDER BY Periodo ASC;
    """
    with db.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall()

@app.get("/notificacoes-reagentes")
def notificacoes_reagentes(db: Connection = Depends(get_db_connection)):
    sql = """
        SELECT n.idNotificacao, n.dataNotificacao, n.classificacaoFinal
        FROM notificacao n
        WHERE n.idNotificacao IN (
            SELECT r.fkIdNotificacao FROM realiza r WHERE r.resultado = '1'
        );
    """
    with db.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall()

@app.get("/pacientes-idosos")
def pacientes_idosos(db: Connection = Depends(get_db_connection)):
    sql = """
        SELECT p.idPaciente, p.anoNasc, n.classificacaoFinal
        FROM paciente p
        JOIN notificacao n ON p.idPaciente = n.fkIdPaciente
        JOIN municipio m ON n.fkIdMunicipio = m.idMunicipio
        WHERE p.anoNasc < (SELECT AVG(anoNasc) FROM paciente);
    """
    with db.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall()