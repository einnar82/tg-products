import React from "react";
import {Box, Image, Text, Flex, Button, Badge, HStack} from "@chakra-ui/react";
import { Tag } from '@/components/ui/tag.tsx'
import { Product } from "@/types/Product";
import { Link } from "react-router-dom";
import { Icon } from "@chakra-ui/react"
import {HiMiniStar} from "react-icons/hi2";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Box
            margin={6}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.2s"
            _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
        >
            {/* Product Image */}
            <Box bg="gray.100" p="4" display="flex" justifyContent="center">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    objectFit="contain"
                    maxH="200px"
                />
            </Box>

            {/* Product Details */}
            <Box p="4">
                {/* Title and Badge */}
                <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="lg" fontWeight="bold" isTruncated>
                        {product.title}
                    </Text>
                    <Badge
                        colorPalette={product.availabilityStatus === "In Stock" ? "green" : "red"}
                    >
                        {product.availabilityStatus}
                    </Badge>
                </Flex>

                {/* Price */}
                <Text fontSize="xl" color="teal.500" fontWeight="bold" mt="2">
                    ${product.price.toFixed(2)}
                </Text>

                {/* Tags */}
                <HStack mt="3" spacing="2" wrap="wrap">
                    {product.tags.slice(0, 3).map((tag: string) => (
                        <Tag key={tag} colorScheme="teal">
                            {tag}
                        </Tag>
                    ))}
                    {product.tags.length > 3 && (
                        <Tag colorScheme="teal">+{product.tags.length - 3} more</Tag>
                    )}
                </HStack>

                {/* Ratings */}
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

                {/* Description */}
                <Text mt="3" fontSize="sm" color="gray.600" noOfLines={2}>
                    {product.description}
                </Text>

                {/* Call-to-Action Button */}
                <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    colorPalette="teal"
                    size="sm"
                    mt="4"
                    width="100%"
                >
                    View Details
                </Button>
            </Box>
        </Box>
    );
};

export default ProductCard;
