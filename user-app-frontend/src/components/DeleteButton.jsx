import { Button, Dialog, Portal } from "@chakra-ui/react";

import { useState } from "react";

const DeleteButton = ({ userId, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(userId);
    setOpen(false);
  };

  return (
    <>
      <Button colorPalette="red" size="sm" onClick={() => setOpen(true)}>
        Delete
      </Button>

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete User</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                Are you sure you want to delete this user?
              </Dialog.Body>

              <Dialog.Footer>
                <Button mr={3} onClick={() => setOpen(false)}>
                  Cancel
                </Button>

                <Button colorScheme="red" onClick={handleDelete}>
                  Delete
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default DeleteButton;
