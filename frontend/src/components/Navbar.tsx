import React, { useState } from "react";
import {Box, Flex, Input, Heading, Spacer, Icon, Group, InputAddon} from "@chakra-ui/react";
import {HiMagnifyingGlass} from "react-icons/hi2";

interface NavbarProps {
    onSearch: (query: string) => void; // Callback to handle search input
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchTerm.trim()) {
            onSearch(searchTerm); // Trigger search only when Enter is pressed
        }
    };

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
            <Flex alignItems="center">
                {/* Brand/Logo */}
                <Heading as="h1" size="lg" color="white">
                    ProductHub
                </Heading>

                {/* Spacer for alignment */}
                <Spacer />

                {/* Search Bar */}
                <Group maxW="600px" w="full" attached>
                    <InputAddon style={{
                        backgroundColor: 'white',
                        border: 'none',
                        color: 'black',
                        fontSize: '1.2rem'
                    }}>
                        <Icon color="black.500">
                            <HiMagnifyingGlass/>
                        </Icon>
                    </InputAddon>
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        bg="white"
                        border="1px"
                        borderColor="gray.300"
                        style={{
                            color: 'black'
                        }}
                        _placeholder={{ color: "gray.500" }}
                    />
                </Group>
            </Flex>
        </Box>
    );
};

export default Navbar;
