SELECT 
    p.idPaciente,
    p.sexo,
    m.nomeMunicipio AS Municipio_Residencia,
    n.dataSintoma,
    n.hospitalizacao
FROM 
    Paciente p
JOIN 
    Notificacao n ON p.idPaciente = n.fkIdPaciente
JOIN 
    Municipio m ON p.fkIdMunicipio = m.idMunicipio
WHERE 
    n.hospitalizacao = '1'; -- Código 1 para Sim