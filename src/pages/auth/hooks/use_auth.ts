import { useContext } from "react";
import { AuthContext } from "../utils/auth_provider";

const useAuth = () => useContext(AuthContext);

export default useAuth;
