import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useUserData from "./common/hooks/useUserData";
import { setUserdata } from "./common/redux/auth_slice";
import { RootState } from "./common/redux/store";
import AllFirPage from "./fragments/fir/page/all_fir_page";
import FirDetailsPage2 from "./fragments/fir/page/fir_details2";
import FIRPage from "./fragments/fir/page/fir_page";
import AddStationFragment from "./fragments/station/pages/station_management";
import RegisterFragment from "./fragments/user_management/register_page";
import AuthPage from "./pages/auth/page/auth_page";
import ErrorPage from "./pages/error/error_page";
import HomePage from "./pages/home/page/home_page";

const App = () => {
  const { isUserLoggedIn, currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const userData = useUserData(currentUser?.user.uid);

  dispatch(setUserdata(userData));

  const getProtectedRoute = (element: ReactNode) => {
    return isUserLoggedIn ? element : <Navigate to="/auth" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={getProtectedRoute(<HomePage />)}>

          {/* fir route */}
          <Route index element={getProtectedRoute(<FIRPage />)} />


          <Route path="fir" element={getProtectedRoute(<AllFirPage />)}>

          </Route>
          {/* <Route path="/fir/:id" element={getProtectedRoute(<FirDetailsPage />)} /> */}
          <Route path="/fir/details" element={getProtectedRoute(<FirDetailsPage2 />)} />

          {/* station routes */}
          <Route path="station"  >
            <Route index element={getProtectedRoute(<AddStationFragment />)} />

          </Route>

          <Route path="register" element={getProtectedRoute(<RegisterFragment />)} />


        </Route>

        {/* auth route */}
        <Route path="/auth" element={isUserLoggedIn ? <Navigate to="/" replace /> : <AuthPage />} />

        {/* error route */}
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
