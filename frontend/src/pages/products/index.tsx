import React, { useEffect } from "react";
import {
    SimpleGrid,
    Container,
    Spinner,
    Text,
    Button,
    Flex,
} from "@chakra-ui/react";
import ProductCard from "@/components/ProductCard";
import { useAppState } from "@/hooks/useAppContext.tsx";

const ProductsPage: React.FC = () => {
    const { state, dispatch, actions } = useAppState();
    const { products, loading, searchTerm, currentPage, total } = state;

    const itemsPerPage = 10;

    useEffect(() => {
        const skip = (currentPage - 1) * itemsPerPage;
        actions.fetchProducts(dispatch, searchTerm, itemsPerPage, skip);
    }, [dispatch, searchTerm, currentPage]);

    const handleNext = () => {
        if (currentPage * itemsPerPage < total) {
            dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage + 1 });
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage - 1 });
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
                        isDisabled={currentPage * itemsPerPage >= total}
                        colorPalette="teal"
                    >
                        Next
                    </Button>
                </Flex>
            </Container>
        </>
    );
};

export default ProductsPage;
