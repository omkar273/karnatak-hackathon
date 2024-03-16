import { doLogout } from "@/pages/auth/utils/auth";
import { useState } from "react";

const HomePage = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const handleRegistration = async () => {
    try {
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };
  return (
    <div className="pg bg-blue-500 flex-col justify-center items-center">
      <div
        className="btn bg-white text-black w-40"
        onClick={async () => {
          await doLogout();
        }}
      >
        Logout
      </div>
      <div
        className="btn bg-white text-black w-40"
        onClick={handleRegistration}
      >
        {isLoading ? "loading" : "Login"}
      </div>
    </div>
  );
};

export default HomePage;
