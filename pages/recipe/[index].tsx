import {
  IconButton,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import Container from '@/components/container';
import RecipeCard from '@/components/recipeCard';
import { Recipe } from '@/types';

const RecipeDetails = () => {
  const router = useRouter();
  const { index } = router.query;
  const [recipe, setRecipe] = useState<Recipe>();
  const route = useRouter();
  const toast = useToast();

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
        toast({
          title: 'Error :(',
          description: error.message,
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  if (!recipe)
    return (
      <Container>
        <Text>No recipe found..</Text>
      </Container>
    );

  return (
    <Container>
      <IconButton
        aria-label="Return to home page"
        onClick={() => route.push('/')}
        icon={<ArrowBackIcon />}
        size="lg"
        mb={4}
      />
      <RecipeCard isDetail recipe={recipe} />
    </Container>
  );
};

export default RecipeDetails;
