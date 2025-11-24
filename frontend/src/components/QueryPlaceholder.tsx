import { Box, Heading, Text, Badge, Code, Flex } from '@chakra-ui/react';
import { Database } from 'lucide-react';

interface Props {
  title: string;
  requirement: string; // Ex: "Junção + Agregação"
  queryName: string;   // Ex: "Consulta 1"
}

export const QueryPlaceholder = ({ title, requirement, queryName }: Props) => {
  return (
    <Box 
      border="2px dashed" 
      borderColor="gray.300" 
      borderRadius="lg" 
      p={6} 
      bg="gray.50"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="200px"
      textAlign="center"
    >
      <Database size={32} color="#CBD5E0" />
      <Badge colorScheme="purple" mb={2} mt={4}>{queryName}</Badge>
      <Heading size="sm" mb={2} color="gray.600">{title}</Heading>
      <Text fontSize="sm" color="gray.500" mb={2}>
        Requisito: <Text as="span" fontWeight="bold">{requirement}</Text>
      </Text>
      <Code fontSize="xs" p={2} borderRadius="md" bg="gray.200">
        Aguardando SQL da equipe...
      </Code>
    </Box>
  );
};