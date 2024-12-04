import { Provider } from "./components/ui/provider.tsx";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import ProductsPage from "@/pages/products";
import ProductInfoPage from "@/pages/products/_id.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider>
          <Router>
              <Routes>
                  <Route path="/" element={<Navigate to="/products"/>} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductInfoPage />} />
              </Routes>
          </Router>
      </Provider>
  </StrictMode>,
)
