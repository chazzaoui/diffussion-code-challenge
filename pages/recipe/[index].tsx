import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Container from '@/components/container';
import RecipeCard from '@/components/recipeCard';
import { Recipe } from '@/types';

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
      <Container>
        <Spinner />
      </Container>
    );

  return (
    <Container>
      {recipe ? <RecipeCard isDetail recipe={recipe} /> : null}
    </Container>
  );
};

export default RecipeDetails;
