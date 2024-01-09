import React, { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

type ContainerProps = {
  children: ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Flex
      padding={4}
      alignItems={'center'}
      justifyContent={'center'}
      minH={'100vh'}
      minW={'100vw'}
      flexDir={'column'}
    >
      {children}
    </Flex>
  );
};

export default Container;
