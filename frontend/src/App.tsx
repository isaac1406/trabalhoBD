import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { SalaSituacao } from './pages/SalaSituacao';
import { Farol } from './pages/Farol';
import { Radar } from './pages/Radar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="sala-situacao" element={<SalaSituacao />} />
            <Route path="farol" element={<Farol />} />
            <Route path="radar" element={<Radar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;