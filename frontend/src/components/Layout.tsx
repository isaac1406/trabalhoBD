import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { LayoutDashboard, FileText, Activity } from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const NavItem = ({ icon, children, to }: any) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} style={{ width: '100%' }}>
      <Flex
        align="center"
        p={3}
        mx={4}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? 'dengue.500' : 'transparent'}
        color={isActive ? 'white' : 'gray.600'}
        _hover={{ bg: 'dengue.500', color: 'white' }}
        transition="all 0.2s"
      >
        <Icon mr="4" fontSize="16" as={icon} />
        <Text fontWeight="medium">{children}</Text>
      </Flex>
    </Link>
  );
};

export const Layout = () => {
  return (
    <Flex minH="100vh" bg="gray.50">
      {/* Sidebar */}
      <Box w="250px" bg="white" boxShadow="md" display={{ base: 'none', md: 'block' }}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Flex align="center" gap={2}>
            <Activity color="#E53E3E" size={28} />
            <Text fontSize="2xl" fontWeight="bold" color="dengue.700">
              DENGUE+
            </Text>
          </Flex>
        </Flex>
        <VStack spacing={2} align="stretch" mt={4}>
          <NavItem icon={LayoutDashboard} to="/">Visão Geral</NavItem>
          <NavItem icon={FileText} to="/relatorios">Relatórios Avançados</NavItem>
        </VStack>
      </Box>

      {/* Conteúdo Principal */}
      <Box flex="1" p={8} overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  );
};