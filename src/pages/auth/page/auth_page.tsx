import capital_tech_logo from "@/assets/images/capital_tech_logo.png";
import { VSpacer } from "@/common/components/spacer";
import { setLogin } from "@/common/redux/auth_slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import InputField from "../components/input_field";
import { doLogin } from "../utils/auth";

const AuthPage = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const handleLogin = async () => {
    // returns if the function is loading
    if (isLoading) return;

    try {
      setisLoading(true);
      // await doSignUp({
      //   email: "omkrsonawane6221@gmail.com",
      //   password: "123456789",
      //   username: "Omkar@1406",
      // });

      const user = await doLogin(username, password);
      console.log(user);
      dispatch(setLogin({ user }));

      setisLoading(false);
    } catch (error) {
      toast(`${error}`, { toastId: "loginError", type: "error" });
      setisLoading(false);
    }
  };

  return (
    <div className="pg md:flex">
      <div className="w-[45%] bg-purple-600"></div>
      <div className="flex-1 p-4 md:p-16">
        <p className="text-xl md:text-3xl font-poppins">
          Welcome to capital tech
        </p>
        <VSpacer height={50} />

        <div className="w-full flex justify-center">
          <img
            src={capital_tech_logo}
            alt="capital tech logo"
            width={200}
            height={200}
          />
        </div>

        {/* login section */}
        <VSpacer height={25} />
        <div>
          <p className="text-xl">Login to Capital Tech</p>
          <VSpacer height={25} />

          <InputField
            hint={"Username"}
            label="Username"
            onChange={(e) => setUsername(e.target.value.trim())}
          />
          <VSpacer height={10} />

          <InputField
            hint={"Password"}
            label="Password"
            onChange={(e) => setpassword(e.target.value.trim())}
          />
          <VSpacer height={25} />

          <div className="btn font-ubuntu cursor-pointer" onClick={handleLogin}>
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                {" Loading "}
                <PulseLoader color="white" loading={isLoading} size={8} />
              </span>
            ) : (
              "Login"
            )}
          </div>
          <VSpacer height={10} />
          <p className="cursor-pointer ">Forget Password?</p>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AuthPage;
