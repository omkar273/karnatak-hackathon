import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RootState } from "./common/redux/store";
import AuthPage from "./pages/auth/page/auth_page";
import ErrorPage from "./pages/error/error_page";
import HomePage from "./pages/home/page/home_page";

const App = () => {
  // localStorage.removeItem("persist:root");
  const { isUserLoggedIn } = useSelector((state: RootState) => state.auth);
  console.log(isUserLoggedIn);

  // const isUserLoggedIn = true;

  const getProtectedRoute = (element: ReactNode) => {
    return isUserLoggedIn ? element : <Navigate to={"/auth"} replace={true} />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            isUserLoggedIn ? <Navigate to={"/"} replace={true} /> : <AuthPage />
          }
        />

        <Route path="/" element={getProtectedRoute(<HomePage />)} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
