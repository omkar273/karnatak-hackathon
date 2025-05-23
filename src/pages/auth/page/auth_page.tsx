import capital_tech_logo from "@/assets/images/capital_tech_logo.png";
import karntankPoliceLogo from "@/assets/images/karnatakpolice.png";
import { VSpacer } from "@/common/components/spacer";
import { setLogin } from "@/common/redux/auth_slice";
import loginData from "@/pages/admin/utils/loginData";
import { Button, Modal } from "antd";
import { useState } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import InputField from "../components/input_field";
import { doLogin } from "../utils/auth";

type LoginData = {
  username: string;
  password: string;
};

const AuthPage = () => {
  const dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const handleLogin: SubmitHandler<LoginData> = async (data) => {
    // returns if the function is loading
    if (isSubmitting) return;

    try {
      const user = await doLogin(data.username.trim(), data.password.trim());
      dispatch(setLogin({ user }));
    } catch (error) {
      toast(`${error}`, { toastId: "loginError", type: "error" });
    }
  };

  const validationOptions: RegisterOptions = {
    required: "Required",
  };

  return (
    <div className="pg block md:flex ">
      {/* password modal */}
      <Modal
        title="Test Credentials"
        centered
        open={modalOpen}
        onCancel={() => setmodalOpen(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            className="bg-blue-600"
            onClick={() => setmodalOpen(false)}
          >
            Ok
          </Button>,
        ]}
      >
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200 border">Name</th>
              <th className="px-4 py-2 bg-gray-200 border">Username</th>
              <th className="px-4 py-2 bg-gray-200 border">Password</th>
            </tr>
          </thead>
          <tbody>
            {loginData.map((cred, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{cred.username}</td>
                <td className="px-4 py-2 border">{cred.username}</td>
                <td className="px-4 py-2 border">123456789</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>

      <div className="md:w-[45%] hidden  bg-cyan-500 md:h-screen md:flex flex-col justify-center items-center text-white text-xl">
        <img src={karntankPoliceLogo} alt="" className="w-[50%]" />
      </div>

      <div className="bg-cyan-500 py-3 px-6 shadow-lg z-10 md:hidden flex justify-between items-center">
        <img src={karntankPoliceLogo} alt="" className="w-16" />
        <p className="text-white text-xl font-bold">CAPITAL TECH</p>
      </div>

      <div
        className={`flex-1 max-h-screen overflow-y-scroll relative bg-[url('${karntankPoliceLogo}')] bg-cover bg-center`}
      >
        <form className=" p-4 md:p-16" onSubmit={handleSubmit(handleLogin)}>
          <p className="text-xl md:text-3xl font-poppins">
            Welcome to CAPITAL TECH
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
            <p className="text-xl">Login to CAPITAL TECH</p>
            <VSpacer height={25} />

            <InputField
              register={register}
              name="username"
              error={errors.username?.message}
              validateOptions={validationOptions}
              label="Username"
            />

            <VSpacer height={35} />

            <InputField
              register={register}
              name="password"
              error={errors.password?.message}
              validateOptions={validationOptions}
              label="Password"
              type="password"
            />

            <VSpacer height={25} />

            <button className="btn font-ubuntu cursor-pointer" type="submit">
              {isSubmitting ? (
                <span className="flex justify-center items-center gap-2">
                  {" Loading "}
                  <PulseLoader color="white" loading={isSubmitting} size={8} />
                </span>
              ) : (
                "Login"
              )}
            </button>
            <VSpacer height={15} />

            <button
              className="btn font-ubuntu cursor-pointer"
              onClick={() => setmodalOpen(true)}
              type="button"
            >
              Show Credentials
            </button>
            <VSpacer height={10} />
            <p className="cursor-pointer ">Forget Password?</p>
          </div>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AuthPage;
