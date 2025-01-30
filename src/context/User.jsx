import {
  useContext,
  createContext,
  useCallback,
  useState,
  useEffect,
} from "react";

import { API_BASE_URL } from "../common/apiUrl";
import axios from "axios";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, { ...newUser, local: true }]);
 };
 
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_BASE_URL);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <StateContext.Provider
      value={{
        users,
        setUsers,
        handleAddUser,
        fetchUsers,
        loading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
