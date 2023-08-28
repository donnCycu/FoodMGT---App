import React from 'react';
import { Button,Flex } from '@chakra-ui/react';
const MealCategory = ({ onSelectCategory }) => {
    const categories = ['Pierwsze dania', 'Drugie dania', 'Napoje'];

    return (
        <Flex justifyContent="start" alignItems="start">
            {categories.map((category, index) => (
                <Button  mr={4} mb={4}
                         p={4}
                         w="9rem"
                         h={20}
                         borderRadius="lg"
                         bg="#D9D9D9"
                         key={index}
                         onClick={() => onSelectCategory(category)}>
                    {category}
                </Button>
            ))}
        </Flex>
    );
};

export default MealCategory;
