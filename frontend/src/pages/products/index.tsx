import React, { useEffect, useState } from "react";
import axios from "axios";
import { SimpleGrid, Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { Product } from "@/types/Product";
import ProductCard from "@/components/ProductCard";

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<{ products: Product[] }>(
                    "http://127.0.0.1:8000/api/products/search?q=phone"
                );
                setProducts(response.data.products);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <Container centerContent mt="10">
                <Spinner size="xl" />
                <Text mt="4">Loading products...</Text>
            </Container>
        );
    }

    return (
        <div>
        <Container maxW="container.lg" py="8">
            <Heading mb="6">Product Listing</Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing="6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </SimpleGrid>
        </Container>
        </div>
    );
};

export default ProductsPage;
