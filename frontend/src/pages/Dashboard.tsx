import { useEffect, useState } from 'react';
import { 
  Box, Heading, SimpleGrid, Text, Card, CardHeader, CardBody, 
  Stat, StatLabel, StatNumber, StatHelpText, 
  Badge, Flex, Icon, Table, Thead, Tbody, Tr, Th, Td, Spinner, Center
} from '@chakra-ui/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line 
} from 'recharts';
import { AlertTriangle, Activity, Database, Users, CheckCircle, Hospital } from 'lucide-react';
import api from '../services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#E53E3E', '#8884d8'];

export const Dashboard = () => {
  // Estados para armazenar os dados REAIS do backend
  const [q1Exames, setQ1Exames] = useState<any[]>([]);
  const [q2Hospitalizados, setQ2Hospitalizados] = useState<any[]>([]);
  const [q3Evolucao, setQ3Evolucao] = useState<any[]>([]);
  const [q4HospMun, setQ4HospMun] = useState<any[]>([]);
  const [q5Alerta, setQ5Alerta] = useState<any[]>([]);
  const [q6Volume, setQ6Volume] = useState<any[]>([]); 
  const [q7Reagentes, setQ7Reagentes] = useState<any[]>([]);
  const [q8Idosos, setQ8Idosos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscando dados reais da API Python
    const fetchData = async () => {
      try {
        const res1 = await api.get('/auditoria-exames');
        setQ1Exames(res1.data);

        const res2 = await api.get('/pacientes-hospitalizados');
        setQ2Hospitalizados(res2.data);

        const res3 = await api.get('/evolucao-por-sexo');
        setQ3Evolucao(res3.data);

        const res4 = await api.get('/hospitalizacoes-municipio');
        setQ4HospMun(res4.data);

        const res5 = await api.get('/municipios-alerta');
        setQ5Alerta(res5.data);

        const res6 = await api.get('/curva-epidemiologica');
        setQ6Volume(res6.data);

        const res7 = await api.get('/notificacoes-reagentes');
        setQ7Reagentes(res7.data);

        const res8 = await api.get('/pacientes-idosos');
        setQ8Idosos(res8.data);
      } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dadosQ3Formatados = q3Evolucao 
    ? q3Evolucao.slice(0, 5).map((item: any) => ({
        name: `${item.evolucao} (${item.sexo})`,
        value: item.Quantidade
      }))
    : [];

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" color="dengue.500" thickness="4px" />
        <Text ml={4} color="gray.500">Carregando dados do SINAN...</Text>
      </Center>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={2}>
        <Heading color="dengue.700">Painel de Consultas SQL</Heading>
      </Flex>
      <Text mb={8} color="gray.500">Dados em tempo real do banco MySQL (8 Consultas Obrigatórias).</Text>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        
        {/* --- 1. Auditoria de Exames --- */}
        <Card borderTop="4px solid" borderColor="blue.400" minW="0">
          <CardHeader pb={0}>
            <Flex align="center" gap={2}>
              <Icon as={Database} color="blue.500" />
              <Heading size="md">1. Auditoria de Exames</Heading>
            </Flex>
            <Text fontSize="xs" color="gray.500">Left Join (Exame + Realiza) + Count</Text>
          </CardHeader>
          <CardBody>
            <Box h="300px" w="100%">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={q1Exames} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="nomeExame" type="category" width={100} style={{ fontSize: '11px' }} />
                  <Tooltip />
                  <Bar dataKey="Qtd_Realizada" fill="#3182CE" name="Qtd. Realizada" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* --- 2. Pacientes Hospitalizados --- */}
        <Card borderTop="4px solid" borderColor="orange.400" minW="0">
          <CardHeader pb={0}>
             <Flex align="center" gap={2}>
              <Icon as={Hospital} color="orange.500" />
              <Heading size="md">2. Pacientes Hospitalizados</Heading>
            </Flex>
            <Text fontSize="xs" color="gray.500">Junção Tripla + Filtro WHERE</Text>
          </CardHeader>
          <CardBody>
            <Stat mt={4}>
              <StatLabel fontSize="xl">Total Internado</StatLabel>
              <StatNumber fontSize="5xl" color="orange.600">{q2Hospitalizados?.length || 0}</StatNumber>
              <StatHelpText>Registros nominais encontrados</StatHelpText>
            </Stat>
            <Box mt={4} maxH="120px" overflowY="auto">
              <Text fontSize="xs" fontWeight="bold" mb={2}>Últimos registros:</Text>
              {q2Hospitalizados && q2Hospitalizados.slice(0, 3).map((p: any) => (
                <Badge key={p.idPaciente} mr={2} mb={2} colorScheme="orange">ID: {p.idPaciente} ({p.sexo})</Badge>
              ))}
            </Box>
          </CardBody>
        </Card>

        {/* --- 3. Evolução por Sexo --- */}
        <Card borderTop="4px solid" borderColor="purple.400" minW="0">
          <CardHeader pb={0}>
             <Flex align="center" gap={2}>
              <Icon as={Users} color="purple.500" />
              <Heading size="md">3. Evolução Clínica por Sexo</Heading>
            </Flex>
            <Text fontSize="xs" color="gray.500">Agregação Dupla (Group By Sexo, Evolucao)</Text>
          </CardHeader>
          <CardBody>
            <Box h="300px" w="100%">
              {dadosQ3Formatados.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={dadosQ3Formatados} 
                      cx="50%" cy="50%" 
                      innerRadius={60} 
                      outerRadius={80} 
                      paddingAngle={5} 
                      dataKey="value" 
                      nameKey="name" 
                      label
                    >
                      {dadosQ3Formatados.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Flex h="100%" align="center" justify="center">
                  <Text color="gray.400">Sem dados para exibir</Text>
                </Flex>
              )}
            </Box>
          </CardBody>
        </Card>

        {/* --- 4. Hospitalizações por Município --- */}
        <Card borderTop="4px solid" borderColor="red.400" minW="0">
          <CardHeader pb={0}>
             <Flex align="center" gap={2}>
              <Icon as={Activity} color="red.500" />
              <Heading size="md">4. Gravidade por Município</Heading>
            </Flex>
            <Text fontSize="xs" color="gray.500">Comparativo: Casos vs. Internações (SUM CASE WHEN)</Text>
          </CardHeader>
          <CardBody>
             <Box h="300px" w="100%">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={q4HospMun ? q4HospMun.slice(0, 5) : []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nomeMunicipio" style={{ fontSize: '10px' }} interval={0} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Total_Casos" fill="#CBD5E0" name="Total Casos" />
                  <Bar dataKey="Total_Hospitalizacoes" fill="#E53E3E" name="Internações" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* --- 5. Municípios em Alerta --- */}
        <Card borderTop="4px solid" borderColor="yellow.400" bg="yellow.50" minW="0">
          <CardHeader pb={0}>
             <Flex align="center" gap={2}>
              <Icon as={AlertTriangle} color="yellow.600" />
              <Heading size="md">5. Municípios em Alerta</Heading>
            </Flex>
            <Text fontSize="xs" color="gray.500">Subconsulta com HAVING ({'>'} 50 casos)</Text>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={2} spacing={2} mt={2}>
              {q5Alerta && q5Alerta.map((m: any, i: number) => (
                <Flex key={i} bg="white" p={2} borderRadius="md" align="center" border="1px solid" borderColor="yellow.200">
                  <Text fontWeight="bold" fontSize="sm">{m.nomeMunicipio}</Text>
                  <Badge ml="auto" colorScheme="red">{m.siglaUF}</Badge>
                </Flex>
              ))}
              {(!q5Alerta || q5Alerta.length === 0) && <Text fontSize="sm">Nenhum município em alerta.</Text>}
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* --- 6. Curva Epidemiológica --- */}
        <Card borderTop="4px solid" borderColor="teal.400" minW="0">
          <CardHeader pb={0}>
             <Flex align="center" gap={2}>
              <Icon as={Activity} color="teal.500" />
              <Heading size="md">6. Curva Epidemiológica</Heading>
            </Flex>
            <Text fontSize="xs" color="gray.500">Agregação Temporal (Group By Mês/Ano)</Text>
          </CardHeader>
          <CardBody>
            <Box h="300px" w="100%">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={q6Volume}> 
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Periodo" style={{ fontSize: '10px' }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Total_Casos" stroke="#319795" strokeWidth={3} dot={{r: 4}} name="Novos Casos" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* --- 7. Notificações Reagentes --- */}
        <Card borderTop="4px solid" borderColor="green.400" minW="0">
          <CardHeader pb={0}>
             <Flex align="center" gap={2}>
              <Icon as={CheckCircle} color="green.500" />
              <Heading size="md">7. Casos Confirmados</Heading>
            </Flex>
            <Text fontSize="xs" color="gray.500">Subconsulta IN (Resultado = '1')</Text>
          </CardHeader>
          <CardBody>
             <Flex align="center" justify="space-between" mt={4}>
               <Box>
                 <Stat>
                    <StatLabel>Positivos</StatLabel>
                    <StatNumber fontSize="4xl" color="green.600">{q7Reagentes?.length || 0}</StatNumber>
                 </Stat>
               </Box>
               <CircularProgressReagentes total={q7Reagentes?.length || 0} />
             </Flex>
          </CardBody>
        </Card>

        {/* --- 8. Pacientes Idosos --- */}
        <Card borderTop="4px solid" borderColor="gray.500" minW="0">
          <CardHeader pb={0}>
             <Flex align="center" gap={2}>
              <Icon as={Users} color="gray.600" />
              <Heading size="md">8. Grupo de Risco (Idosos)</Heading>
            </Flex>
            <Text fontSize="xs" color="gray.500">Subconsulta comparando com AVG(anoNasc)</Text>
          </CardHeader>
          <CardBody>
            <Table size="sm" variant="striped">
              <Thead>
                <Tr><Th>ID</Th><Th>Nasc.</Th><Th>Status</Th></Tr>
              </Thead>
              <Tbody>
                {q8Idosos && q8Idosos.slice(0, 4).map((p: any) => (
                  <Tr key={p.idPaciente}>
                    <Td>{p.idPaciente}</Td>
                    <Td>{p.anoNasc}</Td>
                    <Td><Badge>Monitorar</Badge></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Text fontSize="xs" mt={2} textAlign="center" color="gray.500">
              Total de {q8Idosos?.length || 0} idosos identificados acima da média de idade.
            </Text>
          </CardBody>
        </Card>

      </SimpleGrid>
    </Box>
  );
};

// Componente visual auxiliar
const CircularProgressReagentes = ({ total }: { total: number }) => (
  <Box position="relative" w="80px" h="80px" borderRadius="full" border="8px solid" borderColor="green.100" display="flex" alignItems="center" justifyContent="center">
    <Icon as={CheckCircle} color="green.400" size={32} />
  </Box>
);