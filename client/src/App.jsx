import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ExpensePage from "./Pages/ExpensePage";
import { CreatePage } from "./Pages/CreatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="expenses" element={<ExpensePage />} />
          <Route path="create" element={<CreatePage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
