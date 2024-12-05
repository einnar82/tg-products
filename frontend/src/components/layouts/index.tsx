import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

interface LayoutProps {
    onSearch: (query: string) => void; // Callback for search functionality
    children: React.ReactNode; // Content for individual pages
}

const Layout: React.FC<LayoutProps> = ({ onSearch, children }) => {
    return (
        <Box>
            {/* Navbar */}
            <Navbar onSearch={onSearch} />

            {/* Page Content */}
            <Box as="main" mt="4">
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
