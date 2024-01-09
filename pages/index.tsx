import { Inter } from 'next/font/google';
import {
  Button,
  Flex,
  Grid,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Recipe } from '@/types';
import RecipeCard from './components/recipeCard';
import SearchBar from './components/searchBar';
import { useRouter } from 'next/router';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRouter();

  useEffect(() => {
    fetch(
      'https://master-7rqtwti-yj2le3kr2yhmu.uk-1.platformsh.site/yumazoo/recipes',
      {
        method: 'GET',
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          'There was a problem with the fetch operation:',
          error
        );
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        minH={'100vh'}
        w={'100vw'}
      >
        <Spinner />
      </Flex>
    );

  return (
    <Flex
      padding={4}
      alignItems={'center'}
      justifyContent={'center'}
      minH={'100vh'}
      w={'100vw'}
      flexDir={'column'}
    >
      <SearchBar />
      <Button mb={12} onClick={() => route.push('/create-recipe')}>
        Create recipe
      </Button>
      <SimpleGrid columns={[1, 2, 3]} spacing="40px">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
