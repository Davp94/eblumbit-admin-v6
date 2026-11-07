import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import theme from './theme.ts';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <StyledEngineProvider enableCssLayer> */}
      <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
      </ThemeProvider>
    {/* </StyledEngineProvider> */}

  </StrictMode>,
)
