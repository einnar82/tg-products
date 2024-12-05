import { Provider as ChakraUiProvider } from "./components/ui/provider.tsx";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "@/App.tsx";
import {AppProvider} from "@/providers/appProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppProvider>
          <ChakraUiProvider>
              <App/>
          </ChakraUiProvider>
      </AppProvider>
  </StrictMode>,
)
