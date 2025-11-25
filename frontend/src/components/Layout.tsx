import { Box, Flex, Icon, Text, VStack, Divider } from '@chakra-ui/react';
import { LayoutDashboard, AlertTriangle, Activity, UserPlus } from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const NavItem = ({ icon, children, to }: any) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} style={{ width: '100%' }}>
      <Flex align="center" p={3} mx={4} borderRadius="lg" cursor="pointer"
        bg={isActive ? 'dengue.500' : 'transparent'}
        color={isActive ? 'white' : 'gray.600'}
        _hover={{ bg: 'dengue.500', color: 'white' }}>
        <Icon mr="4" fontSize="16" as={icon} />
        <Text fontWeight="medium">{children}</Text>
      </Flex>
    </Link>
  );
};

export const Layout = () => {
  return (
    <Flex minH="100vh" bg="gray.50">
      <Box w="260px" bg="white" boxShadow="md" display={{ base: 'none', md: 'block' }}>
        <Flex h="20" alignItems="center" mx="8" gap={2}>
          <Activity color="#E53E3E" size={28} />
          <Text fontSize="2xl" fontWeight="bold" color="dengue.700">DENGUE+</Text>
        </Flex>
        
        <VStack spacing={2} align="stretch" mt={4}>
          <Text px={6} fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Principal</Text>
          <NavItem icon={LayoutDashboard} to="/">Consultas</NavItem>
          
          <Divider my={4} />
          
          <Text px={6} fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Funcionalidades Extras</Text>
          <NavItem icon={AlertTriangle} to="/sala-situacao">Sala de Situação</NavItem>
          <NavItem icon={Activity} to="/farol">Farol Hospitalar</NavItem>
          <NavItem icon={UserPlus} to="/radar">Radar Vulnerabilidade</NavItem>
        </VStack>
      </Box>

      <Box flex="1" p={8} overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  );
};