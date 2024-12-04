import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Box, Heading, Text, Image, Spinner } from "@chakra-ui/react";
import { Product } from "@/types/Product";

const ProductInfoPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get<{ product: Product }>(
                    `http://127.0.0.1:8000/api/products/search?id=${id}`
                );
                setProduct(response.data.product);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <Container centerContent mt="10">
                <Spinner size="xl" />
                <Text mt="4">Loading product details...</Text>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container centerContent mt="10">
                <Text mt="4">Product not found.</Text>
            </Container>
        );
    }

    return (
        <Container maxW="container.lg" py="8">
            <Box display="flex" flexDirection={["column", "row"]} gap="6">
                <Image src={product.thumbnail} alt={product.title} boxSize="300px" />
                <Box>
                    <Heading>{product.title}</Heading>
                    <Text mt="2">{product.description}</Text>
                    <Text mt="2" fontWeight="bold">
                        Price: ${product.price.toFixed(2)}
                    </Text>
                    <Text mt="2" color="gray.600">
                        Availability: {product.availabilityStatus}
                    </Text>
                    <Text mt="2">Brand: {product.brand}</Text>
                    <Text mt="2">Category: {product.category}</Text>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductInfoPage;
