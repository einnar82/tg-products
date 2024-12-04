import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    SimpleGrid,
    Container,
    Heading,
    Spinner,
    Text,
    Button,
    Flex,
} from "@chakra-ui/react";
import { Product } from "@/types/Product";
import ProductCard from "@/components/ProductCard";

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    const itemsPerPage = 10; // Number of items to show per page

    const fetchProducts = async (page: number) => {
        setLoading(true);
        const skip = (page - 1) * itemsPerPage;

        try {
            const response = await axios.get<{
                products: Product[];
                total: number;
            }>(
                `http://127.0.0.1:8000/api/products/search?q=phone&limit=${itemsPerPage}&skip=${skip}`
            );
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
    }, [currentPage]);

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

    return (
        <Container maxW="container.lg" py="8">
            <Heading mb="6">Product Listing</Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="8" p="4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </SimpleGrid>

            {/* Pagination Controls */}
            <Flex justifyContent="center" mt="8" gap="4">
                <Button onClick={handlePrevious} isDisabled={currentPage === 1}>
                    Previous
                </Button>
                <Text alignSelf="center">
                    Page {currentPage} of {Math.ceil(total / itemsPerPage)}
                </Text>
                <Button
                    onClick={handleNext}
                    isDisabled={currentPage * itemsPerPage >= total}
                >
                    Next
                </Button>
            </Flex>
        </Container>
    );
};

export default ProductsPage;
