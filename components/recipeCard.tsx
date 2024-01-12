import React from 'react';
import {
  Box,
  Text,
  Flex,
  Tag,
  Badge,
  GridItem,
  HStack,
  VStack,
  Stack,
} from '@chakra-ui/react';

import { Recipe } from '@/types';

const RecipeCard: React.FC<{
  recipe: Recipe;
  isDetail?: boolean;
}> = ({ recipe, isDetail }) => {
  const difficultyLevel =
    ['Easy', 'Medium', 'Hard', 'Expert', 'Hardcore'][
      recipe.difficulty - 1
    ] || 'God';

  return (
    <GridItem w={isDetail ? ['100%', '80%', '50%'] : undefined}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
      >
        <Box p="6">
          <Badge mb={4} borderRadius="full" px="2" colorScheme="teal">
            {recipe.origin}
          </Badge>
          <Box borderRadius={4} p={4} backgroundColor={'#B2F5EA'}>
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {recipe.name}
            </Box>

            <Flex mt="2" alignItems="center">
              <Box fontSize="sm" color="gray.600">
                Difficulty: {difficultyLevel}
              </Box>
            </Flex>
            <Text mt="2">{recipe.description}</Text>
          </Box>
        </Box>
        <HStack justify={'space-between'} p="6" bg="gray.50">
          <VStack alignItems={'start'}>
            <Box>
              <Text fontWeight="bold">Protein</Text>
              <Text fontSize="sm">{recipe.protein}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Spices</Text>
              <Text fontSize="sm">{recipe.spice}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Volume/Weight</Text>
              <Text fontSize="sm">{recipe.volume}g</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Authenticity</Text>
              <Text fontSize="sm">{recipe.authenticity}</Text>
            </Box>
          </VStack>
          <VStack alignItems={'start'}>
            <Box>
              <Text fontWeight="bold">Spice Level</Text>
              <Text fontSize="sm">{recipe.spice}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Cooking Oil</Text>
              <Text fontSize="sm">{recipe.cookingOil}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Serves</Text>
              <Text fontSize="sm">{recipe.serves}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Stock</Text>
              <Text fontSize="sm">{recipe.stock}</Text>
            </Box>
          </VStack>
        </HStack>
      </Box>
    </GridItem>
  );
};

export default RecipeCard;
