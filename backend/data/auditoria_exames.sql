SELECT 
    e.nomeExame,
    COUNT(r.fkIdNotificacao) AS Qtd_Realizada
FROM 
    Exame e
LEFT JOIN 
    Realiza r ON e.idExame = r.fkIdExame
GROUP BY 
    e.nomeExame;