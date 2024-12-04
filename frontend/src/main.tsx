import { Provider } from "./components/ui/provider.tsx";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "@/pages/products";
import ProductInfoPage from "@/pages/products/_id.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider>
          <Router>
              <Routes>
                  <Route path="/" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductInfoPage />} />
              </Routes>
          </Router>
      </Provider>
  </StrictMode>,
)
