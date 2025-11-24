SELECT 
    p.idPaciente,
    p.anoNasc,
    n.classificacaoFinal
FROM 
    Paciente p
JOIN 
    Notificacao n ON p.idPaciente = n.fkIdPaciente
WHERE 
    p.anoNasc < (SELECT AVG(anoNasc) FROM Paciente);