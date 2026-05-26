import { Table, Text } from "@chakra-ui/react";
import DeleteButton from "./DeleteButton";

const UserList = ({ users, onDelete }) => {
  if (!users.length) {
    return <Text>No users found.</Text>;
  }

  return (
    <Table.Root variant="outline">
      <Table.Header bg="gray.100">
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Company</Table.ColumnHeader>
          <Table.ColumnHeader>Role</Table.ColumnHeader>
          <Table.ColumnHeader>Country</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Action</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>
              {user.firstName} {user.lastName}
            </Table.Cell>

            <Table.Cell>{user.company?.name || "-"}</Table.Cell>

            <Table.Cell>{user.company?.title || "-"}</Table.Cell>

            <Table.Cell>{user.address?.country || "-"}</Table.Cell>

            <Table.Cell textAlign="center">
              <DeleteButton userId={user.id} onDelete={onDelete} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default UserList;
