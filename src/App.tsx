import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import useUserData from "./common/hooks/useUserData";
import { RootState } from "./common/redux/store";
import { auth } from "./firebase/firebase_config";
import AuthPage from "./pages/auth/page/auth_page";
import ErrorPage from "./pages/error/error_page";
import HomePage from "./pages/home/page/home_page";

const App = () => {
  const { isUserLoggedIn } = useSelector((state: RootState) => state.auth);
  console.log(isUserLoggedIn);

  const dispatch = useDispatch();

  const userData = useUserData(auth.currentUser?.uid)
  console.log(auth.currentUser?.uid);

  console.log(userData);

  // doSignUp({ email: 'test@gmail.com', password: '123456789', username: 'test' })
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
