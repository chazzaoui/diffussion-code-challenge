import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftAddon, Input } from '@chakra-ui/react';

import React from 'react';

const SearchBar = () => {
  return (
    <InputGroup marginBottom={12} size="sm">
      <InputLeftAddon>
        <SearchIcon />
      </InputLeftAddon>
      <Input placeholder="Search recipes" />
    </InputGroup>
  );
};

export default SearchBar;
