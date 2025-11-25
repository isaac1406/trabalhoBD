import { Box, Heading } from '@chakra-ui/react';
import { FuncionalidadeRadar } from '../components/FuncionalidadeRadar';

export const Radar = () => (
  <Box>
    <Heading mb={6} color="dengue.700">Radar de Vulnerabilidade</Heading>
    <FuncionalidadeRadar />
  </Box>
);