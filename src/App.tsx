import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useUserData from "./common/hooks/useUserData";
import { setUserdata } from "./common/redux/auth_slice";
import { RootState } from "./common/redux/store";
import AllFirPage from "./fragments/fir/page/all_fir_page";
import FirDetailsPage from "./fragments/fir/page/fir_details_page";
import FIRPage from "./fragments/fir/page/fir_page";
import AddStationPage from "./fragments/station/pages/all_station";
import MyStationPage from "./fragments/station/pages/my_station";
import RegisterFragment from "./fragments/user_management/register_page";
import AuthPage from "./pages/auth/page/auth_page";
import ErrorPage from "./pages/error/error_page";
import HomePage from "./pages/home/page/home_page";
import CourtT from "./fragments/court/third_page";
import FirPage from "./fragments/court/fir_page";
import CourtTwo from "./fragments/court/cout_two";
import Record from "./fragments/station/record";
import Manpower from "./fragments/Manpower/manpower";
import Lawnoder from "./fragments/lawNorder/lawnoder";

const App = () => {
  const { isUserLoggedIn, currentUser } = useSelector(
    (state: RootState) => state.auth
  );
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
          <Route path="fir" element={getProtectedRoute(<AllFirPage />)}></Route>

          <Route
            path="/fir_details"
            element={getProtectedRoute(<FirDetailsPage />)}
          />

          {/* station routes */}
          <Route path="station">
            <Route index element={getProtectedRoute(<MyStationPage />)} />
            <Route path="add" element={getProtectedRoute(<AddStationPage />)} />
          </Route>

          <Route
            path="register"
            element={getProtectedRoute(<RegisterFragment />)}
          />

          <Route path="/CourtT" element={getProtectedRoute(<CourtT />)} />

          <Route path="/FirPage" element={getProtectedRoute(<FirPage />)} />

          <Route path="/CourtTwo" element={getProtectedRoute(<CourtTwo />)} />

          <Route path="/Record" element={getProtectedRoute(<Record />)} />

          <Route path="/Manpower" element={getProtectedRoute(<Manpower />)} />

          <Route path="/Lawnoder" element={getProtectedRoute(<Lawnoder />)} />
        </Route>

        {/* auth route */}
        <Route
          path="/auth"
          element={isUserLoggedIn ? <Navigate to="/" replace /> : <AuthPage />}
        />

        {/* error route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
