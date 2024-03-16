import capital_tech_logo from "@/assets/images/capital_tech_logo.png";
import { VSpacer } from "@/common/components/spacer";
import InputField from "../components/input_field";

const AuthPage = () => {
  return (
    <div className="pg md:flex">
      <div className="w-[45%] bg-blue-500"></div>
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

          <InputField hint={"Email"} label="Email" />
          <VSpacer height={10} />

          <InputField hint={"Password"} label="Password" />
          <VSpacer height={25} />

          <div className="btn font-ubuntu cursor-pointer" onClick={() => {}}>
            Login
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
