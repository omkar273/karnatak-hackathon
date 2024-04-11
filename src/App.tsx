import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import useUserData from "./common/hooks/useUserData";
import { setUserdata } from "./common/redux/auth_slice";
import { RootState } from "./common/redux/store";
import FirDetailsPage from "./fragments/fir/page/fir_details_page";
import AuthPage from "./pages/auth/page/auth_page";
import ErrorPage from "./pages/error/error_page";
import HomePage from "./pages/home/page/home_page";

const App = () => {
  const { isUserLoggedIn, currentUser } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const userData = useUserData(currentUser?.user.uid)

  dispatch(setUserdata(userData));

  const getProtectedRoute = (element: ReactNode) => {
    return isUserLoggedIn ? element : <Navigate to={"/auth"} replace={true} />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: getProtectedRoute(<HomePage />),
    },
    {
      path: "/fir/:id",
      element: getProtectedRoute(<FirDetailsPage />),
    },
    {
      path: "/auth",
      element: isUserLoggedIn ? (
        <Navigate to={"/"} replace={true} />
      ) : (
        <AuthPage />
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
