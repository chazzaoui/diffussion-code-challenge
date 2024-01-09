import { Inter } from 'next/font/google';
import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Recipe } from '@/types';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  console.log({ recipes });
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      minH={'100vh'}
      w={'100vw'}
    >
      <p>Hey</p>
    </Flex>
  );
}
