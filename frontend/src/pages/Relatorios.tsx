import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { QueryPlaceholder } from '../components/QueryPlaceholder';

export const Relatorios = () => {
  return (
    <Box>
      <Heading mb={2} color="gray.700">Relatórios Detalhados</Heading>
      <Text mb={8} color="gray.500">Consultas complexas envolvendo múltiplas tabelas e subconsultas.</Text>

      <SimpleGrid columns={1} spacing={8}>
        
        {/* Espaço para a Consulta 6 */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <Heading size="md" mb={4}>Análise de Exames Específicos</Heading>
          <QueryPlaceholder 
            title="Pacientes com Sorologia Positiva sem Internação" 
            requirement="Subconsulta (NOT IN)" 
            queryName="Consulta 6" 
          />
        </Box>

        {/* Espaço para a Consulta 7 */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <Heading size="md" mb={4}>Evolução de Casos Críticos</Heading>
          <QueryPlaceholder 
            title="Municípios com aumento de casos > média estadual" 
            requirement="Agregação + Subconsulta Aninhada" 
            queryName="Consulta 7" 
          />
        </Box>

        {/* Espaço para a Consulta 8 */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <Heading size="md" mb={4}>Cruzamento Demográfico</Heading>
          <QueryPlaceholder 
            title="Incidência por Faixa Etária e Escolaridade" 
            requirement="Múltiplos JOINS + Group By" 
            queryName="Consulta 8" 
          />
        </Box>

      </SimpleGrid>
    </Box>
  );
};