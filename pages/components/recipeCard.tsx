import {
  Box,
  Heading,
  Text,
  Flex,
  Tag,
  Image,
  Stack,
  Badge,
} from '@chakra-ui/react';

const RecipeCard = () => {
  return (
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
            Spanish Paella
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
            Spanish Paella
          </Box>
          <Tag size="sm" colorScheme="teal" borderRadius="full">
            M
          </Tag>
        </Flex>

        <Flex mt="2" alignItems="center">
          <Box fontSize="sm" color="gray.600">
            <Image
              borderRadius="full"
              boxSize="10"
              src="emoji.png"
              alt="Difficulty Emoji"
              mr="2"
            />
            Difficulty: Medium
          </Box>
        </Flex>

        <Text mt="2">
          Spanish paella is a traditional rice dish that originated in
          the Valencia region of Spain. It was originally made with
          ingredients such as saffron, rabbit, and snails, which were
          common in the area.
        </Text>
      </Box>

      <Stack mt="3" isInline spacing={4} p="6" bg="gray.50">
        <Box>
          <Text fontWeight="bold">Protein</Text>
          <Text fontSize="sm">Jumbo Shrimp</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Spice Level</Text>
          <Text fontSize="sm">Hot</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Spices</Text>
          <Text fontSize="sm">Saffron</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Cooking Oil</Text>
          <Text fontSize="sm">Spanish Olive Oil</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Volume/Weight</Text>
          <Text fontSize="sm">700g</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Serves</Text>
          <Text fontSize="sm">4</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Authenticity</Text>
          <Text fontSize="sm">Unverified</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Stock</Text>
          <Text fontSize="sm">Chicken</Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default RecipeCard;
