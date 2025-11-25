SELECT 
    n.idNotificacao,
    n.dataNotificacao,
    n.classificacaoFinal
FROM 
    Notificacao n
WHERE 
    n.idNotificacao IN (
        SELECT r.fkIdNotificacao 
        FROM Realiza r 
        WHERE r.resultado = '1' -- Código 1 para Reagente
    );