import React, { useContext, useState } from 'react';
import {
  InputGroup,
  InputLeftAddon,
  Input,
  Box,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Recipe } from '@/types';
import { RecipeContext } from '@/providers/getRecipeProvider';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const { recipes } = useContext(RecipeContext);
  const route = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(
    []
  );

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
      // this mapping fixes the original indexes being messed up
      // it makes sure that I call recipe/number endpoint with right item index
      const indexedRecipes = recipes.map((recipe, index) => ({
        index,
        ...recipe,
      }));
      const filtered = indexedRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRecipes(filtered.slice(0, 3));
    } else {
      setFilteredRecipes([]);
    }
  };

  return (
    <Box cursor={'pointer'} marginBottom={12}>
      <InputGroup size="sm">
        <InputLeftAddon>
          <SearchIcon />
        </InputLeftAddon>
        <Input
          placeholder="Search recipes"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
      {filteredRecipes.length > 0 && (
        <VStack align="stretch">
          {filteredRecipes.map((recipe) => (
            <Box
              onClick={() => route.push(`/recipe/${recipe.index}`)}
              key={recipe.name + recipe.index}
              p={2}
              shadow="md"
            >
              <Text>{recipe.name}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default SearchBar;
