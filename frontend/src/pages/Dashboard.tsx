import { SimpleGrid, Box, Heading, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { QueryPlaceholder } from '../components/QueryPlaceholder';

// DADOS MOCKADOS (Substituir pelo Backend depois)
const dadosMunicipios = [
  { name: 'Rio de Janeiro', casos: 4000 },
  { name: 'Niterói', casos: 3000 },
  { name: 'Duque de Caxias', casos: 2000 },
  { name: 'Nova Iguaçu', casos: 2780 },
];

const dadosSexo = [
  { name: 'Masculino', value: 400 },
  { name: 'Feminino', value: 300 },
];
const CORES_PIZZA = ['#0088FE', '#FF8042'];

const CardKpi = ({ title, value, change }: any) => (
  <Box bg="white" p={5} shadow="sm" borderRadius="lg" borderLeft="4px solid" borderColor="dengue.500">
    <Stat>
      <StatLabel color="gray.500">{title}</StatLabel>
      <StatNumber fontSize="3xl" color="dengue.700">{value}</StatNumber>
      <StatHelpText>
        <StatArrow type="increase" /> {change} vs mês anterior
      </StatHelpText>
    </Stat>
  </Box>
);

export const Dashboard = () => {
  return (
    <Box>
      <Heading mb={6} color="gray.700">Painel de Monitoramento da Dengue</Heading>
      
      {/* 1. KPIs - Consultas de Agregação Simples */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <CardKpi title="Total de Notificações" value="50.234" change="23%" />
        <CardKpi title="Casos Graves" value="1.205" change="5%" />
        <Box position="relative">
           {/* Exemplo de onde entraria uma query real */}
           <QueryPlaceholder title="Média de Dias de Internação" requirement="AVG + Group By" queryName="Consulta 3" />
        </Box>
      </SimpleGrid>

      {/* 2. Gráficos Principais */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        
        {/* Gráfico de Barras */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <Heading size="md" mb={4}>Casos por Município (Top 5)</Heading>
          <Box h="300px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosMunicipios}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="casos" fill="#E53E3E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Text fontSize="xs" color="gray.400" mt={2}>(Consulta 4: Join Notificacao + Municipio)</Text>
        </Box>

        {/* Gráfico de Pizza */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <Heading size="md" mb={4}>Distribuição por Sexo</Heading>
          <Box h="300px" display="flex" justifyContent="center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dadosSexo} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                  {dadosSexo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CORES_PIZZA[index % CORES_PIZZA.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Text fontSize="xs" color="gray.400" mt={2}>(Consulta 5: Group By Sexo)</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};