SELECT 
    p.idPaciente,
    p.anoNasc,
    n.classificacaoFinal
FROM 
    Paciente p
JOIN 
    Notificacao n ON p.idPaciente = n.fkIdPaciente
JOIN 
    municipio m ON n.fkIdMunicipio = m.idMunicipio
WHERE 
    p.anoNasc < (SELECT AVG(anoNasc) FROM Paciente);