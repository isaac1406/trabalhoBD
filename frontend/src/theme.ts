// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    dengue: {
      100: '#FED7D7', // Vermelho bem claro (fundo)
      500: '#E53E3E', // Vermelho alerta (principal)
      700: '#9B2C2C', // Vermelho sangue (texto forte)
      900: '#63171B', // Escuro
    },
    brand: {
      gray: '#F7FAFC', // Fundo clínico
    }
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'brand.gray',
        color: 'gray.800',
      },
    },
  },
});

export default theme;