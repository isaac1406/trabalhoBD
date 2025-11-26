SELECT 
    p.sexo,
    n.evolucao, -- Exibe o código da evolução (ex: 1-Cura, 2-Óbito)
    COUNT(n.idNotificacao) AS Quantidade
FROM 
    Paciente p
JOIN 
    Notificacao n ON p.idPaciente = n.fkIdPaciente
JOIN 
    municipio m ON n.fkIdMunicipio = m.idMunicipio
WHERE n.evolucao = '1'
OR n.evolucao = '2'
GROUP BY 
    p.sexo, n.evolucao;