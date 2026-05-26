import { Button, HStack, Text } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <HStack spacing={4} mt={6} justifyContent="center">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        _disabled={{
          bg: "gray.300",
          color: "gray.500",
          cursor: "not-allowed",
        }}
      >
        Previous
      </Button>

      <Text fontWeight="bold">
        Page {currentPage} of {totalPages || 1}
      </Text>

      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
        _disabled={{
          bg: "gray.300",
          color: "gray.500",
          cursor: "not-allowed",
        }}
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
