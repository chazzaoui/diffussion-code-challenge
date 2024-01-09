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
} from '@chakra-ui/react';
import { Recipe } from '@/types';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

export default function CreateRecipe() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Recipe>();

  const route = useRouter();

  const onSubmit: SubmitHandler<Recipe> = async (values) => {
    try {
      const response = await fetch(
        'https://master-7rqtwti-yj2le3kr2yhmu.uk-1.platformsh.site/yumazoo/recipes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      alert('Recipe created successfully');
    } catch (error) {
      console.error('Failed to submit recipe', error);
      alert('Failed to submit recipe');
    }
  };

  return (
    <Flex flexDir={'column'} padding={4}>
      <IconButton
        aria-label="Return to home page"
        onClick={() => route.push('/')}
        width={24}
      >
        <ArrowBackIcon />
      </IconButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="Enter recipe name"
            {...register('name', { required: 'Name is required' })}
          />
          <FormErrorMessage>
            {errors.name && <>{errors.name.message}</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.origin}>
          <FormLabel htmlFor="origin">Origin</FormLabel>
          <Input
            id="origin"
            placeholder="Enter recipe origin"
            {...register('origin', {
              required: 'Origin is required',
            })}
          />
          <FormErrorMessage>
            {errors.origin && <>errors.origin.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            placeholder="Enter recipe description"
            {...register('description', {
              required: 'Description is required',
            })}
          />
          <FormErrorMessage>
            {errors.description && <>errors.description.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.difficulty}>
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

        <FormControl isInvalid={!!errors.protein}>
          <FormLabel htmlFor="protein">Protein</FormLabel>
          <Input
            id="protein"
            placeholder="Enter protein used"
            {...register('protein', {
              required: 'Protein is required',
            })}
          />
          <FormErrorMessage>
            {errors.protein && <>errors.protein.message</>}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.produce}>
          <FormLabel htmlFor="produce">Produce</FormLabel>
          <Input
            id="produce"
            placeholder="Enter produce used"
            {...register('produce', {
              required: 'produce is required',
            })}
          />
          <FormErrorMessage>
            {errors.produce && <>errors.produce.message</>}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.spice}>
          <FormLabel htmlFor="spice">Spice</FormLabel>
          <Input
            id="spice"
            placeholder="Enter spice used"
            {...register('spice', {
              required: 'spice is required',
            })}
          />
          <FormErrorMessage>
            {errors.spice && <>errors.spice.message</>}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.cookingOil}>
          <FormLabel htmlFor="cookingOil">Cooking Oil</FormLabel>
          <Input
            id="coockingOil"
            placeholder="Enter cookingOil used"
            {...register('cookingOil', {
              required: 'cookingOil is required',
            })}
          />
          <FormErrorMessage>
            {errors.cookingOil && <>errors.cookingOil.message</>}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.volume}>
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
        <FormControl isInvalid={!!errors.serves}>
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
        <FormControl isInvalid={!!errors.authenticity}>
          <FormLabel htmlFor="authenticity">Authenticity</FormLabel>
          <Input
            id="authenticity"
            placeholder="Enter authenticity used"
            {...register('authenticity', {
              required: 'authenticity is required',
            })}
          />
          <FormErrorMessage>
            {errors.authenticity && <>errors.authenticity.message</>}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.stock}>
          <FormLabel htmlFor="stock">Stock</FormLabel>
          <Input
            id="stock"
            placeholder="Enter stock used"
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
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Flex>
  );
}
