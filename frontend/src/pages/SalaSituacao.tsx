import { Box, Heading } from '@chakra-ui/react';
import { FuncionalidadeAlerta } from '../components/FuncionalidadeAlerta';

export const SalaSituacao = () => (
  <Box>
    <Heading mb={6} color="dengue.700">Sala de Situação</Heading>
    <FuncionalidadeAlerta />
  </Box>
);