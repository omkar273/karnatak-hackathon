import capital_tech_logo from "@/assets/images/capital_tech_logo.png";
import { VSpacer } from "@/common/components/spacer";
import { setLogin } from "@/common/redux/auth_slice";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import InputField from "../components/input_field";
import { doLogin } from "../utils/auth";

type LoginData = {
  username: string,
  password: string,
}

const AuthPage = () => {
  const dispatch = useDispatch();

  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<LoginData>()


  const handleLogin: SubmitHandler<LoginData> = async (data) => {
    // returns if the function is loading
    if (isSubmitting) return;

    try {

      const user = await doLogin(data.username, data.password);
      console.log(user);
      dispatch(setLogin({ user }));

    } catch (error) {
      toast(`${error}`, { toastId: "loginError", type: "error" });
    }
  };

  const validationOptions: RegisterOptions = {
    required: 'Required'
  }

  return (
    <div className="pg md:flex">
      <div className="w-[45%] bg-purple-600"></div>
      <form className="flex-1 p-4 md:p-16" onSubmit={handleSubmit(handleLogin)}>
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
            register={register}
            name="username"
            error={errors.username?.message}
            validateOptions={validationOptions}
            label="Username"
          />
          <VSpacer height={10} />

          <InputField
            register={register}
            name="password"
            error={errors.password?.message}
            validateOptions={validationOptions}
            label="Password"
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
          <VSpacer height={10} />
          <p className="cursor-pointer ">Forget Password?</p>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AuthPage;
