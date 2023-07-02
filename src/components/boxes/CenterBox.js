import { Box } from "@chakra-ui/react";

const CenteredBox = ({ children, ...props }) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            {...props}
        >
            {children}
        </Box>
    );
};

export default CenteredBox;
