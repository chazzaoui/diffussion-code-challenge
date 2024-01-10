import { Button, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SearchBar from '@/components/searchBar';
import RecipeCard from '@/components/recipeCard';
import { RecipeContext } from '@/providers/getRecipeProvider';
import Container from '@/components/container';

export default function Home() {
  const route = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isRecipeAmountLoading, setIsRecipeAmountLoading] =
    useState<boolean>(true);
  const [recipesAmount, setRecipeAmount] = useState('');
  const { recipes, isRecipesLoading } = useContext(RecipeContext);
  useEffect(() => {
    fetch(
      'https://master-7rqtwti-yj2le3kr2yhmu.uk-1.platformsh.site/yumazoo/recipes/number',
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
        setRecipeAmount(data.message);
        setIsRecipeAmountLoading(false);
      })
      .catch((error) => {
        console.error(
          'There was a problem with the fetch operation:',
          error
        );
        setError(error.message);
        setIsRecipeAmountLoading(false);
      });
  }, []);

  if (isRecipeAmountLoading || isRecipesLoading)
    return (
      <Container>
        <Spinner />
      </Container>
    );
  console.log(recipes);
  return (
    <Container>
      <SearchBar />
      <Button mb={8} onClick={() => route.push('/create-recipe')}>
        Create recipe
      </Button>
      <Text mb={2}>{recipesAmount} recipes available</Text>
      <SimpleGrid columns={[1, 2, 3]} spacing="40px">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
