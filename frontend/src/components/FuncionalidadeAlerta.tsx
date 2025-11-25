import { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, Icon, Badge, Flex, Spinner } from '@chakra-ui/react';
import { AlertTriangle, MapPin } from 'lucide-react';
import api from '../services/api';
import type { MunicipioAlerta } from '../types';

export const FuncionalidadeAlerta = () => {
  const [municipios, setMunicipios] = useState<MunicipioAlerta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/municipios-alerta')
      .then(res => setMunicipios(res.data))
      .catch(err => console.error("Erro ao buscar alertas", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner color="red.500" />;

  return (
    <Box bg="red.50" p={6} borderRadius="xl" border="1px solid" borderColor="red.200">
      <Flex align="center" mb={4} gap={2}>
        <Icon as={AlertTriangle} color="red.600" boxSize={6} />
        <Heading size="md" color="red.800">Sala de Situação: Municípios em Surto</Heading>
      </Flex>
      <Text fontSize="sm" color="red.600" mb={4}>
        Municípios com volume crítico de notificações ({'>'} 50 casos) requerem intervenção imediata.
      </Text>
      
      {municipios.length === 0 ? (
        <Badge colorScheme="green" p={2}>Nenhum município em estado crítico</Badge>
      ) : (
        <SimpleGrid columns={{ base: 2, md: 4, lg: 5 }} spacing={3}>
          {municipios.map((mun, i) => (
            <Box key={i} bg="white" p={3} borderRadius="md" boxShadow="sm" borderLeft="4px solid" borderColor="red.500">
              <Flex align="center" gap={2}>
                <MapPin size={14} color="#E53E3E" />
                <Text fontWeight="bold" fontSize="sm">{mun.nomeMunicipio}/{mun.siglaUF}</Text>
              </Flex>
              <Badge mt={2} colorScheme="red" variant="solid" fontSize="xs">ALERTA MÁXIMO</Badge>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};