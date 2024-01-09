import RecipeCard from '@/components/recipeCard';
import { Recipe } from '@/types';
import { Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const RecipeDetails = () => {
  const router = useRouter();
  const { index } = router.query;
  const [recipe, setRecipe] = useState<Recipe>();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(
      `https://master-7rqtwti-yj2le3kr2yhmu.uk-1.platformsh.site/yumazoo/recipes/${index}`,
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
        setRecipe(data.message);
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
      alignItems={'center'}
      justifyContent={'center'}
      minH={'100vh'}
      w={'100vw'}
    >
      {recipe ? <RecipeCard recipe={recipe} /> : null}
    </Flex>
  );
};

export default RecipeDetails;
