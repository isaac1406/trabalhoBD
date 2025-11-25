import { useEffect, useState } from 'react';
import { Box, Heading, Button, Text, Flex, Icon, SimpleGrid, Avatar } from '@chakra-ui/react';
import { Download, UserPlus } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from '../services/api';
import type { PacienteIdoso } from '../types';

export const FuncionalidadeRadar = () => {
  const [idosos, setIdosos] = useState<PacienteIdoso[]>([]);

  useEffect(() => {
    api.get('/pacientes-idosos').then(res => setIdosos(res.data)).catch(console.error);
  }, []);

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Vulnerabilidade - Pacientes Idosos", 14, 15);
    doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 14, 22);
    
    autoTable(doc, {
      startY: 30,
      head: [['ID Paciente', 'Ano Nasc.', 'Idade Estimada', 'Classificação']],
      body: idosos.map(p => [
        p.idPaciente, 
        p.anoNasc, 
        (new Date().getFullYear() - p.anoNasc), 
        p.classificacaoFinal || 'Em investigação'
      ]),
    });
    doc.save('vulnerabilidade_dengue.pdf');
  };

  return (
    <Box bg="purple.50" p={6} borderRadius="xl" border="1px dashed" borderColor="purple.300">
      <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={2}>
        <Box>
          <Heading size="md" color="purple.800">Radar de Vulnerabilidade</Heading>
          <Text fontSize="sm" color="purple.600">Pacientes acima da média de idade que requerem visita domiciliar.</Text>
        </Box>
        <Button leftIcon={<Download size={18} />} colorScheme="purple" onClick={gerarPDF} size="sm">
          Baixar Relatório Oficial
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={4}>
        {idosos.slice(0, 6).map((paciente) => (
          <Box key={paciente.idPaciente} bg="white" p={3} borderRadius="lg" textAlign="center">
            <Avatar size="sm" bg="purple.200" icon={<UserPlus size={16} />} mb={2} />
            <Text fontWeight="bold" fontSize="sm">ID: {paciente.idPaciente}</Text>
            <Text fontSize="xs" color="gray.500">Nasc: {paciente.anoNasc}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <Text mt={2} fontSize="xs" textAlign="center" color="gray.500">
        ...e mais {Math.max(0, idosos.length - 6)} pacientes listados no PDF.
      </Text>
    </Box>
  );
};