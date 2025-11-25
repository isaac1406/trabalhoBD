import { Box, Heading } from '@chakra-ui/react';
import { FuncionalidadeFarol } from '../components/FuncionalidadeFarol';

export const Farol = () => (
  <Box>
    <Heading mb={6} color="dengue.700">Farol de Gravidade Hospitalar</Heading>
    <FuncionalidadeFarol />
  </Box>
);