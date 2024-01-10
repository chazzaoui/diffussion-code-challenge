import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  Flex,
  IconButton,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

import Container from '@/components/container';
import { Recipe } from '@/types';

export default function CreateRecipe() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<Recipe>();
  const toast = useToast();
  const route = useRouter();
  const [isPosting, setIsPosting] = useState(false);

  const onSubmit: SubmitHandler<Recipe> = (values) => {
    setIsPosting(true);

    fetch(
      'https://master-7rqtwti-yj2le3kr2yhmu.uk-1.platformsh.site/yumazoo/recipes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
      })
      .then(() => {
        setIsPosting(false);
        toast({
          title: 'Recipe created! :)',
          description: 'Successfully created ya recipe fam',
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
        reset();
      })
      .catch((error) => {
        setIsPosting(false);
        console.error('Failed to submit recipe', error);
        toast({
          title: 'Error :(',
          description: error.message,
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
      });
  };

  return (
    <Container>
      <Flex justify="space-between" align="center" gap={4} mb="8">
        <IconButton
          aria-label="Return to home page"
          onClick={() => route.push('/')}
          icon={<ArrowBackIcon />}
          size="lg"
        />
        <Heading>Create Recipe</Heading>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={2} isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="Enter recipe name"
            maxLength={40}
            {...register('name', { required: 'Name is required' })}
          />
          <FormErrorMessage>
            {errors.name && <>{errors.name.message}</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={2} isInvalid={!!errors.origin}>
          <FormLabel htmlFor="origin">Origin</FormLabel>
          <Input
            id="origin"
            placeholder="Enter recipe origin"
            maxLength={2}
            {...register('origin', {
              required: 'Origin is required',
            })}
          />
          <FormErrorMessage>
            {errors.origin && <>errors.origin.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={2} isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            placeholder="Enter recipe description"
            maxLength={250}
            {...register('description', {
              required: 'Description is required',
            })}
          />
          <FormErrorMessage>
            {errors.description && <>errors.description.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={2} isInvalid={!!errors.difficulty}>
          <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
          <NumberInput>
            <NumberInputField
              id="difficulty"
              type="number"
              placeholder="Enter difficulty level"
              {...register('difficulty', {
                required: 'Difficulty is required',
                min: { value: 1, message: 'Minimum value is 1' },
              })}
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.difficulty && <>errors.difficulty.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={2} isInvalid={!!errors.protein}>
          <FormLabel htmlFor="protein">Protein</FormLabel>
          <Input
            id="protein"
            placeholder="Enter protein used"
            maxLength={15}
            {...register('protein', {
              required: 'Protein is required',
            })}
          />
          <FormErrorMessage>
            {errors.protein && <>errors.protein.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={2} isInvalid={!!errors.produce}>
          <FormLabel htmlFor="produce">Produce</FormLabel>
          <Input
            id="produce"
            placeholder="Enter produce used"
            maxLength={15}
            {...register('produce', {
              required: 'produce is required',
            })}
          />
          <FormErrorMessage>
            {errors.produce && <>errors.produce.message</>}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={2} isInvalid={!!errors.spice}>
          <FormLabel htmlFor="spice">Spice</FormLabel>
          <Input
            id="spice"
            placeholder="Enter spice used"
            maxLength={15}
            {...register('spice', {
              required: 'spice is required',
            })}
          />
          <FormErrorMessage>
            {errors.spice && <>errors.spice.message</>}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={2} isInvalid={!!errors.cookingOil}>
          <FormLabel htmlFor="cookingOil">Cooking Oil</FormLabel>
          <Input
            id="cookingOil"
            placeholder="Enter cookingOil used"
            maxLength={15}
            {...register('cookingOil', {
              required: 'cookingOil is required',
            })}
          />
          <FormErrorMessage>
            {errors.cookingOil && <>errors.cookingOil.message</>}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={2} isInvalid={!!errors.volume}>
          <FormLabel htmlFor="volume">Volume</FormLabel>
          <Input
            id="volume"
            type="number"
            placeholder="Enter volume used"
            {...register('volume', {
              required: 'volume is required',
            })}
          />
          <FormErrorMessage>
            {errors.volume && <>errors.volume.message</>}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={2} isInvalid={!!errors.serves}>
          <FormLabel htmlFor="serves">Serves</FormLabel>
          <Input
            id="serves"
            placeholder="Enter serves used"
            type="number"
            {...register('serves', {
              required: 'serves is required',
            })}
          />
          <FormErrorMessage>
            {errors.serves && <>errors.serves.message</>}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={2} isInvalid={!!errors.authenticity}>
          <FormLabel htmlFor="authenticity">Authenticity</FormLabel>
          <Input
            id="authenticity"
            placeholder="Enter authenticity used"
            maxLength={15}
            {...register('authenticity', {
              required: 'authenticity is required',
            })}
          />
          <FormErrorMessage>
            {errors.authenticity && <>errors.authenticity.message</>}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={2} isInvalid={!!errors.stock}>
          <FormLabel htmlFor="stock">Stock</FormLabel>
          <Input
            id="stock"
            placeholder="Enter stock used"
            maxLength={15}
            {...register('stock', {
              required: 'stock is required',
            })}
          />
          <FormErrorMessage>
            {errors.stock && <>errors.stock.message</>}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting || isPosting}
          type="submit"
          disabled={!isValid}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
