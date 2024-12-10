import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./mainPage";
import AddBlog from "./addBlog";
import Login from "./auth/login";
import {AuthProvider} from "./auth/Context"
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Addblog" element={<AddBlog />} />
        <Route path="/Login" element={<Login/>} />

      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;