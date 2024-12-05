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
    const navigate = useNavigate();
    const { state, dispatch, actions } = useAppState();
    const { suggestions } = state;

    const [searchTerm, setSearchTerm] = useState<string>("");

    // Debounced Search Term
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchTerm(query);
    };

    // Handle logo click
    const handleLogoClick = () => {
        dispatch({ type: "SET_SEARCH_TERM", payload: "" });
        dispatch({ type: "SET_SUGGESTIONS", payload: [] });
        navigate("/");
    };

    const handleSearch = (query: string) => {
        dispatch({ type: "SET_SEARCH_TERM", payload: query });
        actions.searchProducts(query, dispatch);
        dispatch({ type: "SET_SUGGESTIONS", payload: [] }); // Clear suggestions
        navigate(`/products`); // Redirect to search results
    };

    // Handle key press (Enter)
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchTerm.trim()) {
            dispatch({ type: "SET_SEARCH_TERM", payload: searchTerm });
            actions.searchProducts(searchTerm, dispatch); // Trigger a search
        }
    };

    // Update debounced search term with a delay
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // Adjust debounce time as needed

        return () => clearTimeout(debounceTimeout);
    }, [searchTerm]);

    // Trigger suggestions fetch based on the debounced term
    useEffect(() => {
        if (debouncedSearchTerm.trim()) {
            actions.fetchSuggestions(debouncedSearchTerm, dispatch);
        } else {
            dispatch({ type: "SET_SUGGESTIONS", payload: [] });
        }
    }, [debouncedSearchTerm, dispatch, actions]);

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
                                        onClick={() => handleSearch(suggestion)}
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
