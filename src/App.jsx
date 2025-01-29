import { Route, Routes } from "react-router-dom";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
       <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/edit/:userId" element={<EditUser />} />
      <Route path="/add" element={<AddUser />} />
    </Routes>
    <Toaster/>
    </div>
   
  );
};

export default App;
