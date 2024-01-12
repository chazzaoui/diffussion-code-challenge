declare const chrome: any;

import {
  Button,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SearchBar from '@/components/searchBar';
import RecipeCard from '@/components/recipeCard';
import { RecipeContext } from '@/providers/RecipeProvider';
import Container from '@/components/container';
import { isChromeExtension } from '@/utils/isChromeExtension';

export default function Home() {
  const route = useRouter();
  const [isRecipeAmountLoading, setIsRecipeAmountLoading] =
    useState<boolean>(true);
  const [recipesAmount, setRecipeAmount] = useState('');
  const { recipes, isRecipesLoading } = useContext(RecipeContext);
  const toast = useToast();
  const runningAsExtension = isChromeExtension();

  useEffect(() => {
    // would normally abstract the endpoint to an env, so that whenever it changes you can just update it their
    // or swicth between different environments with different endpoints
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
        toast({
          title: 'Error :(',
          description: error.message,
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
        setIsRecipeAmountLoading(false);
      });
  }, []);

  if (isRecipeAmountLoading || isRecipesLoading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  return (
    <Container>
      <SearchBar />
      {/* For sake of the challenge handled this button like this, but would never do this in production */}
      {/* Would probably just have a different type of page for this */}
      {runningAsExtension ? (
        <Button
          mb={8}
          onClick={() =>
            chrome.tabs.create({ url: 'http://localhost:3000' })
          }
        >
          Open web app
        </Button>
      ) : (
        <Button mb={8} onClick={() => route.push('/create-recipe')}>
          Create recipe
        </Button>
      )}
      <Text mb={2}>{recipesAmount} recipes available</Text>
      <SimpleGrid columns={[1, 2, 3]} spacing="40px">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
