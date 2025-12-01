SELECT 
    p.idPaciente,
    p.anoNasc,
    p.sexo,
    p.fkIdMunicipio
FROM 
    Paciente p
WHERE 
    p.fkIdMunicipio IN (
        SELECT fkIdMunicipio 
        FROM Notificacao 
        GROUP BY fkIdMunicipio 
        HAVING COUNT(idNotificacao) > 50
    );