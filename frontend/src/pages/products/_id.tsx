import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Image,
    Text,
    Heading,
    Badge,
    Spinner,
    Container,
    VStack,
    HStack,
    Separator,
    Button,
    Stack, Icon,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { Product } from "@/types/Product";
import {HiMiniStar} from "react-icons/hi2";

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get<Product>(
                    `http://localhost:8000/api/products/${id}`
                );
                setProduct(response.data);
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
                <Text fontSize="lg" color="red.500">
                    Product not found.
                </Text>
                <Button as={Link} to="/" colorScheme="teal" mt="4">
                    Go Back to Product List
                </Button>
            </Container>
        );
    }

    return (
        <Container maxW="container.lg" py="8">
            <Button as={Link} to="/" colorScheme="teal" mb="6">
                Back to Products
            </Button>

            <Flex flexDirection={{ base: "column", md: "row" }} gap="8">
                {/* Product Image */}
                <Box flex="1" bg="gray.100" p="4" borderRadius="lg" boxShadow="md">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        objectFit="contain"
                        borderRadius="lg"
                        maxH="400px"
                        mx="auto"
                    />
                </Box>

                {/* Product Details */}
                <VStack align="start" spacing="4" flex="2">
                    <Heading size="lg">{product.title}</Heading>
                    <Badge
                        colorPalette={
                            product.availabilityStatus === "In Stock"
                                ? "green"
                                : "red"
                        }
                        fontSize="lg"
                    >
                        {product.availabilityStatus}
                    </Badge>
                    <Text fontSize="xl" fontWeight="bold" color="teal.500">
                        ${product.price.toFixed(2)}
                    </Text>
                    <HStack spacing="4">
                        <Text fontSize="sm" color="gray.600">
                            SKU: {product.sku}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            Brand: {product.brand}
                        </Text>
                    </HStack>
                    <Text fontSize="md" color="gray.600">
                        {product.description}
                    </Text>
                    <Separator />
                    <Text fontSize="md" fontWeight="semibold">
                        Tags:
                    </Text>
                    <HStack wrap="wrap" gap="2">
                        {product.tags.map((tag) => (
                            <Badge key={tag} colorScheme="teal">
                                {tag}
                            </Badge>
                        ))}
                    </HStack>
                    <HStack mt="2">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <Icon
                                    key={i}
                                    color={i < Math.round(product.rating) ? "yellow.400" : "gray.300"}
                                >
                                    <HiMiniStar />
                                </Icon>
                            ))}
                        <Text fontSize="sm" color="gray.600">
                            ({product.rating.toFixed(1)})
                        </Text>
                    </HStack>
                    <Separator />
                    <Text fontSize="sm" color="gray.500">
                        Shipping Information: {product.shippingInformation}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        Warranty: {product.warrantyInformation}
                    </Text>
                </VStack>
            </Flex>

            {/* Reviews Section */}
            <Box mt="8" py="4">
                <Heading size="md" mb="4">
                    Customer Reviews
                </Heading>
                {product.reviews && product.reviews.length > 0 ? (
                    <Stack spacing="4">
                        {product.reviews.map((review, index) => (
                            <Box
                                key={index}
                                p="4"
                                borderWidth="1px"
                                borderRadius="lg"
                                bg="gray.50"
                                boxShadow="sm"
                            >
                                <HStack justify="space-between" align="start">
                                    <Text fontWeight="bold" style={{
                                        color: 'black'
                                    }}>{review.reviewerName}</Text>
                                    <Badge
                                        colorPalette={review.rating >= 4 ? "green" : "yellow"}
                                    >
                                        {review.rating} Stars
                                    </Badge>
                                </HStack>
                                <Text fontSize="sm" color="gray.600" mt="2">
                                    {review.comment}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <Text fontSize="sm" color="gray.600">
                        No reviews available for this product.
                    </Text>
                )}
            </Box>
        </Container>
    );
};

export default ProductDetailPage;
