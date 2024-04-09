import { ReactNode } from "react";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { RootState } from "./common/redux/store";
import AuthPage from "./pages/auth/page/auth_page";
import ErrorPage from "./pages/error/error_page";
import HomePage from "./pages/home/page/home_page";
import Record from "./fragments/station/record";
import Reports from './fragments/station/report';

const App = () => {
  // localStorage.removeItem("persist:root");
  const { isUserLoggedIn } = useSelector((state: RootState) => state.auth);
  console.log(isUserLoggedIn);

  // const isUserLoggedIn = true;

  const getProtectedRoute = (element: ReactNode) => {
    return isUserLoggedIn ? element : <Navigate to={"/auth"} replace={true} />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: getProtectedRoute(<HomePage />),
    },
    {
      path: "/auth",
      element: isUserLoggedIn ? (
        <Navigate to={"/"} replace={true} />
      ) : (
        <Reports />
      ),
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
