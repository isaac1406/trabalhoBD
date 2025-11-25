import { useEffect, useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Progress, Badge, Icon } from '@chakra-ui/react';
import { Activity } from 'lucide-react';
import api from '../services/api';
import type { HospitalizacaoMunicipio } from '../types';

export const FuncionalidadeFarol = () => {
  const [dados, setDados] = useState<HospitalizacaoMunicipio[]>([]);

  useEffect(() => {
    api.get('/hospitalizacoes-municipio')
      .then(res => setDados(res.data))
      .catch(console.error);
  }, []);

  const getStatus = (casos: number, internacoes: number) => {
    if (casos === 0) return { color: 'gray', label: 'Sem dados' };
    const taxa = (internacoes / casos) * 100;
    if (taxa < 5) return { color: 'green', label: 'Estável' };
    if (taxa < 15) return { color: 'yellow', label: 'Atenção' };
    return { color: 'red', label: 'Colapso' };
  };

  return (
    <Box bg="white" p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor="gray.100">
      <Heading size="md" mb={4} display="flex" alignItems="center" gap={2}>
        <Icon as={Activity} /> Farol de Gravidade Hospitalar
      </Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Município</Th>
              <Th isNumeric>Casos</Th>
              <Th isNumeric>Internações</Th>
              <Th>Taxa de Gravidade</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dados.slice(0, 5).map((d, i) => { // Mostrando top 5
              const status = getStatus(d.Total_Casos, d.Total_Hospitalizacoes);
              const taxa = d.Total_Casos > 0 ? (d.Total_Hospitalizacoes / d.Total_Casos) * 100 : 0;
              
              return (
                <Tr key={i}>
                  <Td fontWeight="medium">{d.nomeMunicipio}</Td>
                  <Td isNumeric>{d.Total_Casos}</Td>
                  <Td isNumeric>{d.Total_Hospitalizacoes}</Td>
                  <Td>
                    <Progress value={taxa} max={20} colorScheme={status.color} size="sm" borderRadius="full" />
                  </Td>
                  <Td>
                    <Badge colorScheme={status.color}>{status.label}</Badge>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};