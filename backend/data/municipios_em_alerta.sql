SELECT m.nomeMunicipio, COUNT(idNotificacao) AS num_casos
FROM municipio m
JOIN notificacao n
	on m.idMunicipio = n.fkIdMunicipio
GROUP BY m.nomeMunicipio HAVING COUNT(idNotificacao) > 50
