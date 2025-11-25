SELECT 
    DATE_FORMAT(n.dataSintoma, '%Y-%m') AS Periodo,
    COUNT(n.idNotificacao) AS Total_Casos
FROM notificacao n
WHERE n.dataSintoma IS NOT NULL
GROUP BY Periodo
ORDER BY Periodo ASC;