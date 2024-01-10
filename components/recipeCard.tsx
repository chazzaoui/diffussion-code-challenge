import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Tag,
  Stack,
  Badge,
  GridItem,
  HStack,
} from '@chakra-ui/react';
import { Recipe } from '@/types';

const RecipeCard: React.FC<{
  recipe: Recipe;
  isDetail?: boolean;
}> = ({ recipe, isDetail }) => {
  const difficultyLevel =
    ['Easy', 'Medium', 'Hard', 'Expert'][recipe.difficulty - 1] ||
    'Unknown';

  return (
    <GridItem w={isDetail ? '100%' : undefined}>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
      >
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {recipe.name}
            </Badge>
          </Box>

          <Flex
            mt="1"
            justifyContent="space-between"
            alignContent="center"
          >
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {recipe.name}
            </Box>
            <Tag size="sm" colorScheme="teal" borderRadius="full">
              {difficultyLevel[0]}
            </Tag>
          </Flex>

          <Flex mt="2" alignItems="center">
            <Box fontSize="sm" color="gray.600">
              Difficulty: {difficultyLevel}
            </Box>
          </Flex>

          <Text mt="2">{recipe.description}</Text>
        </Box>

        <HStack mt="3" justify={'space-between'} p="6" bg="gray.50">
          <Box>
            <Text fontWeight="bold">Protein</Text>
            <Text fontSize="sm">{recipe.protein}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Spice Level</Text>
            <Text fontSize="sm">{recipe.spice}</Text>
          </Box>
        </HStack>
        <HStack mt="3" justify={'space-between'} p="6" bg="gray.50">
          <Box>
            <Text fontWeight="bold">Spices</Text>
            <Text fontSize="sm">{recipe.spice}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Cooking Oil</Text>
            <Text fontSize="sm">{recipe.cookingOil}</Text>
          </Box>
        </HStack>
        <HStack mt="3" justify={'space-between'} p="6" bg="gray.50">
          <Box>
            <Text fontWeight="bold">Volume/Weight</Text>
            <Text fontSize="sm">{recipe.volume}g</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Serves</Text>
            <Text fontSize="sm">{recipe.serves}</Text>
          </Box>
        </HStack>
        <HStack mt="3" justify={'space-between'} p="6" bg="gray.50">
          <Box>
            <Text fontWeight="bold">Authenticity</Text>
            <Text fontSize="sm">{recipe.authenticity}</Text>
          </Box>

          <Box>
            <Text fontWeight="bold">Stock</Text>
            <Text fontSize="sm">{recipe.stock}</Text>
          </Box>
        </HStack>
      </Box>
    </GridItem>
  );
};

export default RecipeCard;
