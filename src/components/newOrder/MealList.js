import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';

const MealList = ({ selectedCategory, onMealClick }) => {
    const meals = {
        'Pierwsze dania': [
            { name: 'Zupa pomidorowa', price: '12.99 zł' },
            { name: 'Rosół', price: '10.99 zł' }
        ],
        'Drugie dania': [
            { name: 'Schabowy', price: '22.99 zł' },
            { name: 'Pierogi', price: '18.99 zł' }
        ],
        'Napoje': [
            { name: 'Woda', price: '4.99 zł' },
            { name: 'Sok', price: '6.99 zł' }
        ],
    };

    return (
        <Flex justifyContent="start" alignItems="start" mt={4}>
            {meals[selectedCategory]?.map((meal, index) => (
                <Button
                    mr={4} mb={4}
                    p={4}
                    w="9rem"
                    h={20}
                    borderRadius="lg"
                    bg="#D9D9D9"
                    key={index}
                    onClick={() => onMealClick(meal)}
                >
                    <Flex flexDirection="column">
                        <Text>{`${meal.name}`}</Text>
                        <Text>{`${meal.price}`}</Text>
                    </Flex>
                </Button>
            ))}
        </Flex>
    );
};

export default MealList;
