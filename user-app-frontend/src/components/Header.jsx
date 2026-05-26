import { Flex, Heading, Button } from "@chakra-ui/react";

const Header = ({ onRefresh, onAddUser }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={6}
      flexWrap="wrap"
      gap={3}
    >
      <Heading size="lg">User Management</Heading>

      <Flex gap={3}>
        <Button colorScheme="blue" onClick={onRefresh}>
          Refresh
        </Button>

        <Button colorScheme="green" onClick={onAddUser}>
          +
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;