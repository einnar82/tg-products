import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import ProductsPage from "@/pages/products";
import ProductDetailPage from "@/pages/products/_id.tsx";
import {useState} from "react";
import Layout from "@/components/layouts";

function App() {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = (query: string) => {
        setSearchQuery(query); // Update the search query for all pages
        console.log("Search query:", query);
    };

  return (
      <Router>
          <Layout onSearch={handleSearch}>
              <Routes>
                  <Route path="/" element={<Navigate to="/products"/>} />
                  <Route path="/products" element={<ProductsPage searchQuery={searchQuery}/>} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
              </Routes>
          </Layout>
      </Router>
  )
}

export default App
