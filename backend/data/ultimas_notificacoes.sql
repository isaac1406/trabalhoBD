SELECT 
    n.idNotificacao,
    n.dataNotificacao,
    n.evolucao
FROM 
    Notificacao n
WHERE 
    n.dataNotificacao = (
        SELECT MAX(dataNotificacao) 
        FROM Notificacao
    );