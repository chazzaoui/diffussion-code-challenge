import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  IconButton,
  useToast,
  Heading,
  Box,
  Select,
  HStack,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

import Container from '@/components/container';
import { Recipe } from '@/types';
import { countries } from '@/constants/countries';

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
    // would based on api type use a more robust fetching library, eg react-query for more options.
    // For the sake of the challenge wanted to keep it native
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
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="6"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack mb={2}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                placeholder="Enter recipe name"
                maxLength={40}
                {...register('name', {
                  required: 'Name is required',
                })}
              />
              <FormErrorMessage>
                {errors.name && <>{errors.name.message}</>}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.origin}>
              <FormLabel htmlFor="origin">Origin</FormLabel>
              <Select
                id="origin"
                placeholder="Select country"
                {...register('origin', {
                  required: 'Origin is required',
                })}
              >
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.origin && errors.origin.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>

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
          <HStack mb={2}>
            <FormControl isInvalid={!!errors.difficulty}>
              <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
              <Select
                id="difficulty"
                placeholder="Select difficulty"
                {...register('difficulty', {
                  required: 'Difficulty is required',
                })}
              >
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
                <option value="4">Expert</option>
                <option value="5">Hardcore</option>
              </Select>
              <FormErrorMessage>
                {errors.difficulty && errors.difficulty.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.protein}>
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
          </HStack>
          <HStack mb={2}>
            <FormControl isInvalid={!!errors.produce}>
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
            <FormControl isInvalid={!!errors.spice}>
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
          </HStack>
          <HStack mb={2}>
            <FormControl isInvalid={!!errors.cookingOil}>
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
            <FormControl isInvalid={!!errors.volume}>
              <FormLabel htmlFor="volume">Volume</FormLabel>
              <InputGroup>
                <Input
                  id="volume"
                  type="number"
                  placeholder="Enter volume used"
                  {...register('volume', {
                    required: 'volume is required',
                  })}
                />
                <InputRightAddon>grams</InputRightAddon>
              </InputGroup>
              <FormErrorMessage>
                {errors.volume && <>errors.volume.message</>}
              </FormErrorMessage>
            </FormControl>
          </HStack>
          <HStack mb={2}>
            <FormControl isInvalid={!!errors.serves}>
              <FormLabel htmlFor="serves">Serves</FormLabel>
              <InputGroup>
                <Input
                  id="serves"
                  placeholder="Enter serves used"
                  type="number"
                  {...register('serves', {
                    required: 'serves is required',
                  })}
                />
                <InputRightAddon>people</InputRightAddon>
              </InputGroup>
              <FormErrorMessage>
                {errors.serves && <>errors.serves.message</>}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.authenticity}>
              <FormLabel htmlFor="authenticity">
                Authenticity
              </FormLabel>
              <Select
                id="authenticity"
                placeholder="Select authenticity"
                {...register('authenticity', {
                  required: 'Authenticity is required',
                })}
              >
                <option value="Verified">Verified</option>
                <option value="Unverified">Unverified</option>
              </Select>
              <FormErrorMessage>
                {errors.authenticity && errors.authenticity.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>
          <FormControl mb={4} isInvalid={!!errors.stock}>
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
            colorScheme="teal"
            isLoading={isSubmitting || isPosting}
            type="submit"
            isDisabled={!isValid}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}
