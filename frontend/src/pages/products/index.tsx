import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    SimpleGrid,
    Container,
    Spinner,
    Text,
    Button,
    Flex,
} from "@chakra-ui/react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";

interface ProductsPageProps {
    searchQuery: string; // Search query passed from Navbar
}

const ProductsPage: React.FC<ProductsPageProps> = ({ searchQuery }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    const itemsPerPage = 10; // Number of items per page

    const fetchProducts = async (page: number) => {
        setLoading(true);
        const skip = (page - 1) * itemsPerPage;
        const endpoint = searchQuery
            ? `http://127.0.0.1:8000/api/products/search?q=${searchQuery}&limit=${itemsPerPage}&skip=${skip}`
            : `http://127.0.0.1:8000/api/products?limit=${itemsPerPage}&skip=${skip}`;

        try {
            const response = await axios.get<{
                products: Product[];
                total: number;
            }>(endpoint);
            setProducts(response.data.products);
            setTotal(response.data.total);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, searchQuery]);

    const handleNext = () => {
        if (currentPage * itemsPerPage < total) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    if (loading) {
        return (
            <Container centerContent mt="10">
                <Spinner size="xl" />
                <Text mt="4">Loading products...</Text>
            </Container>
        );
    }

    if (products.length === 0) {
        return (
            <Container centerContent mt="10">
                <Text mt="4">No results found.</Text>
            </Container>
        );
    }

    return (
        <>
            {/* Product Grid */}
            <Container maxW="container.lg" py="8">
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="8" p="4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </SimpleGrid>

                {/* Pagination Controls */}
                <Flex justifyContent="center" mt="8" gap="4">
                    <Button
                        onClick={handlePrevious}
                        isDisabled={currentPage === 1}
                        colorPalette="teal"
                    >
                        Previous
                    </Button>
                    <Text alignSelf="center">
                        Page {currentPage} of {Math.ceil(total / itemsPerPage)}
                    </Text>
                    <Button
                        onClick={handleNext}
                        colorPalette="teal"
                        isDisabled={currentPage * itemsPerPage >= total}
                    >
                        Next
                    </Button>
                </Flex>
            </Container>
        </>
    );
};

export default ProductsPage;
