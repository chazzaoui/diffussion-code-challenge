import { useToast } from '@chakra-ui/react';
import { useState, useEffect, createContext, ReactNode } from 'react';

import { Recipe } from '@/types';

type RecipeContextType = {
  isRecipesLoading: boolean;
  recipes: Recipe[];
};

type ContainerProps = {
  children: ReactNode;
};

export const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  isRecipesLoading: false,
});

export const RecipeProvider: React.FC<ContainerProps> = ({
  children,
}) => {
  const [isRecipesLoading, setIsRecipesLoading] =
    useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const toast = useToast();

  const fetchRecipes = () => {
    setIsRecipesLoading(true);
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
        setIsRecipesLoading(false);
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
        setIsRecipesLoading(false);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{ isRecipesLoading, recipes }}>
      {children}
    </RecipeContext.Provider>
  );
};
