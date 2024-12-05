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
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/hooks/useAppContext.tsx";

const Navbar: React.FC = () => {
    const { state, dispatch, actions } = useAppState();
    const { suggestions, searchTerm } = state;
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setLocalSearchTerm(query);
        dispatch({ type: "SET_SEARCH_TERM", payload: query });

        if (!query.trim()) {
            dispatch({ type: "SET_SUGGESTIONS", payload: [] }); // Clear suggestions if input is empty
        } else {
            actions.fetchSuggestions(query, dispatch); // Fetch suggestions
        }
    };

    const handleSearch = () => {
        dispatch({ type: "SET_SEARCH_TERM", payload: localSearchTerm });
        actions.searchProducts(localSearchTerm, dispatch); // Trigger search
        navigate("/"); // Redirect to the product list page
    };

    const handleLogoClick = () => {
        dispatch({ type: "SET_SEARCH_TERM", payload: "" });
        actions.fetchProducts(dispatch, searchTerm); // Fetch all products
        navigate("/");
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        const debounceFetch = setTimeout(() => {
            if (localSearchTerm.trim()) {
                actions.fetchSuggestions(localSearchTerm, dispatch);
            }
        }, 300); // Debounce API calls by 300ms

        return () => clearTimeout(debounceFetch);
    }, [localSearchTerm]);

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
                <Heading
                    as="h1"
                    size="lg"
                    color="white"
                    onClick={handleLogoClick}
                    style={{ cursor: "pointer" }}
                >
                    DummyProducts
                </Heading>

                <Spacer />

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
                        value={localSearchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        bg="white"
                        border="1px"
                        borderColor="gray.300"
                        style={{ color: "black" }}
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
                                            dispatch({ type: "SET_SEARCH_TERM", payload: suggestion });
                                            actions.searchProducts(suggestion, dispatch);
                                            navigate("/");
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
