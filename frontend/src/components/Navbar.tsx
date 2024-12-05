import React, { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Input,
    Heading,
    Spacer,
    Icon,
    Group,
    InputAddon,
    List,
    Text,

} from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

interface NavbarProps {
    onSearch: (query: string) => void; // Callback to handle search input
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const navigate = useNavigate();
    const handleLogoClick = () => {
        setSearchTerm(""); // Reset the search term
        setSuggestions([]); // Clear suggestions
        onSearch(""); // Trigger search with an empty query
        navigate("/"); // Navigate to the home page
    };


    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (searchTerm.trim()) {
                onSearch(searchTerm); // Fetch specific products if there’s a search term
            } else {
                const allProducts = await fetchAllProducts();
                onSearch(""); // Clear the term to indicate fetching all products
                console.log(allProducts); // Use this to debug fetched products
            }
        }
    };

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/products");
            return response.data.products || [];
        } catch (error) {
            console.error("Failed to fetch all products:", error);
            return [];
        }
    };

    const fetchSuggestions = async (query: string) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get<{ products: { title: string }[] }>(
                `http://127.0.0.1:8000/api/products/search?q=${query}`
            );
            const productTitles = response.data.products.map((product) => product.title);
            setSuggestions(productTitles);
        } catch (error) {
            console.error("Failed to fetch suggestions:", error);
            setSuggestions([]);
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (!e.target.value.trim()) {
            setSuggestions([]); // Clear suggestions if input is empty
        } else {
            fetchSuggestions(e.target.value);
        }
    };

    useEffect(() => {
        const debounceFetch = setTimeout(() => {
            fetchSuggestions(searchTerm);
        }, 300); // Debounce API calls by 300ms

        return () => clearTimeout(debounceFetch);
    }, [searchTerm]);

    return (
        <Box
            bg="teal.500"
            py="4"
            px="8"
            boxShadow="md"
            position="sticky"
            top="0"
            zIndex="sticky"
        >
            <Flex alignItems="center" position="relative">
                {/* Brand/Logo */}
                <Heading
                    as="h1"
                    size="lg"
                    color="white"
                    onClick={handleLogoClick}
                    style={{ cursor: "pointer" }}
                >
                    DummyProducts
                </Heading>

                {/* Spacer for alignment */}
                <Spacer />

                {/* Search Bar */}
                <Group maxW="600px" w="full" attached>
                    <InputAddon
                        style={{
                            backgroundColor: "white",
                            border: "none",
                            color: "black",
                            fontSize: "1.2rem",
                        }}
                    >
                        <Icon color="black.500">
                            <HiMagnifyingGlass />
                        </Icon>
                    </InputAddon>
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        bg="white"
                        border="1px"
                        borderColor="gray.300"
                        style={{
                            color: "black",
                        }}
                        _placeholder={{ color: "gray.500" }}
                    />
                    {/* Suggestions Dropdown */}
                    {suggestions.length > 0 && (
                        <Box
                            position="absolute"
                            top="100%"
                            left="0"
                            right="0"
                            mt="2"
                            bg="white"
                            boxShadow="lg"
                            borderRadius="md"
                            zIndex="20"
                            width="100%" // Matches the search bar width
                            maxH="250px"
                            overflowY="auto"
                        >
                            <List.Root>
                                {suggestions.map((suggestion, index) => (
                                    <List.Item
                                        key={index}
                                        padding="10px 15px"
                                        borderRadius="md"
                                        bg="gray.50"
                                        _hover={{ backgroundColor: "teal.50", cursor: "pointer" }}
                                        onClick={() => {
                                            setSearchTerm(suggestion);
                                            onSearch(suggestion);
                                            setSuggestions([]); // Clear suggestions after selection
                                        }}
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Icon color="black.500" mr="3">
                                            <HiMagnifyingGlass />
                                        </Icon>
                                        <Text>{suggestion}</Text>
                                    </List.Item>
                                ))}
                            </List.Root>
                        </Box>
                    )}
                </Group>
            </Flex>
        </Box>
    );
};

export default Navbar;
