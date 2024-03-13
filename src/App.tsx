import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/page/auth_page";
import ErrorPage from "./pages/error/error_page";
import HomePage from "./pages/home/page/home_page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/auth" element={<AuthPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
