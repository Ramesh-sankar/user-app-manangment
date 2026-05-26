import { Input, Flex } from "@chakra-ui/react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Flex justifyContent="flex-end" mb={6} width={'365px'}>
      <Input
      type="search"
        placeholder="Search by name, company, role or country..."
        mb={6}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Flex>
  );
};

export default SearchBar;
