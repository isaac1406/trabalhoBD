SELECT 
    m.nomeMunicipio,
    m.siglaUF,
    COUNT(n.idNotificacao) AS Total_Casos,
    -- Considerando código '1' como Sim para hospitalização
    SUM(CASE WHEN n.hospitalizacao = '1' THEN 1 ELSE 0 END) AS Total_Hospitalizacoes
FROM 
    Municipio m
JOIN 
    Notificacao n ON m.idMunicipio = n.fkIdMunicipio
GROUP BY 
    m.nomeMunicipio, m.siglaUF
ORDER BY 
    Total_Casos DESC;