import { useEffect, useMemo, useState } from "react";
import { Container, Spinner, Center } from "@chakra-ui/react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";

import { fetchUsers } from "./services/userService";
import Pagination from "./components/Pagination";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers();
  }, []);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      firstName: "Static",
      lastName: "User",
      company: {
        name: "Avivo",
        title: "Full Stack Developer",
        department: "Develpment",
      },
      address: {
        country: "India",
      },
    };

    setUsers((prev) => [newUser, ...prev]);
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

      const company = user.company?.name?.toLowerCase() || "";

      const role = user.company?.title?.toLowerCase() || "";

      const country = user.address?.country?.toLowerCase() || "";

      const search = debouncedSearch.toLowerCase();

      return (
        fullName.includes(search) ||
        company.includes(search) ||
        role.includes(search) ||
        country.includes(search)
      );
    });
  }, [users, debouncedSearch]);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const USERS_PER_PAGE = 5;
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const safeCurrentPage = currentPage > totalPages ? totalPages : currentPage;
  const paginatedUsers = filteredUsers.slice(
    (safeCurrentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE,
  );

  return (
    <Container maxW="container.xl" py={10}>
      <Header onRefresh={loadUsers} onAddUser={handleAddUser} />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <Center mt={10}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <>
          <UserList users={paginatedUsers} onDelete={handleDeleteUser} />
          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
}

export default App;
