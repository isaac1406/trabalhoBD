SELECT 
    m.nomeMunicipio,
    m.siglaUF
FROM 
    Municipio m
WHERE 
    m.idMunicipio IN (
        SELECT fkIdMunicipio 
        FROM Notificacao 
        GROUP BY fkIdMunicipio 
        HAVING COUNT(idNotificacao) > 50
    );