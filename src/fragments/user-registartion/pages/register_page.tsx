import { VSpacer } from "@/common/components/spacer";
import InputField from "@/pages/auth/components/input_field";
import { doSignUp } from "@/pages/auth/utils/auth";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import MultiStep from 'react-multistep';
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";


export type UserModel = {
    name: string;
    post: string;
    dateOfJoining: string;
    batch: string;
    currentPosting: string;
    workExperience: string;
    certification: string;
    qualification: string;
    solvedCases: string;
    height: string;
    weight: string;
    previousPosting: string;
    skills: string;
    awards: string;
    email: string;
    password: string;
    username: string;
}

const RegisterFragment = () => {
    const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm<UserModel>()

    const onSubmit: SubmitHandler<UserModel> = async (data) => {
        try {
            if (isSubmitting) {
                return;
            }
            console.log(data);
            await doSignUp({
                password: data.password,
                email: data.email,
                data: data,
                username: data.username
            });

            toast.success('User registered successfully')
            reset()
        } catch (error) {
            toast.error(`${error}`)
        }

    }

    const personalDetails = [
        {
            label: 'Name',
            error: errors.name?.message,
            name: 'name'
        },
        {
            label: 'post',
            error: errors.post?.message,
            name: 'post'
        },
        {
            label: 'Date of joning',
            error: errors.dateOfJoining?.message,
            name: 'dateOfJoining'
        },
        {
            label: 'batch',
            error: errors.batch?.message,
            name: 'batch'
        },

        {
            label: 'height',
            error: errors.height?.message,
            name: 'height'
        },
        {
            label: 'weight',
            error: errors.weight?.message,
            name: 'weight'
        },

        {
            label: 'skills',
            error: errors.skills?.message,
            name: 'skills'
        },
        {
            label: 'awards',
            error: errors.awards?.message,
            name: 'awards'
        },
    ]

    const workDetails = [

        {
            label: 'certification',
            error: errors.certification?.message,
            name: 'certification'
        },
        {
            label: 'qualification',
            error: errors.qualification?.message,
            name: 'qualification'
        },
        {
            label: 'currentPosting',
            error: errors.currentPosting?.message,
            name: 'currentPosting'
        },
        {
            label: 'workExperience',
            error: errors.workExperience?.message,
            name: 'workExperience'
        },

        {
            label: 'solvedCases',
            error: errors.solvedCases?.message,
            name: 'solvedCases'
        },
        {
            label: 'previousPosting',
            error: errors.previousPosting?.message,
            name: 'previousPosting'
        },
    ]

    const registrationDetails = [
        {
            label: 'username',
            error: errors.username?.message,
            name: 'username'
        },
        {
            label: 'Email',
            error: errors.email?.message,
            name: 'email'
        },

        {
            label: 'Password',
            error: errors.password?.message,
            name: 'password'
        },

    ]

    const validationOptions: RegisterOptions = {
        required: 'Required'
    }

    return (
        <div className="">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0">
                {"FIR Management"}
            </p>
            <div className="p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="card w-full  p-5 bg-white">
                    <MultiStep

                        activeStep={0}
                        prevButton={{
                            title: 'Back',
                            style: {
                                padding: '0.55rem 1rem',
                                borderRadius: '1rem',
                                backgroundColor: 'skyblue',
                                color: 'white',
                                margin: '1rem'
                            }
                        }}
                        nextButton={{
                            title: 'Next',
                            style: {
                                padding: '0.55rem 1rem',
                                borderRadius: '1rem',
                                backgroundColor: 'skyblue',
                                color: 'white',
                                margin: '1rem'

                            }
                        }}
                    >
                        <div title="Personal details" className="md:grid grid-cols-2 items-start gap-10">
                            {
                                personalDetails.map((item, index) => {
                                    return (
                                        <InputField<UserModel>
                                            key={index}
                                            validateOptions={validationOptions}
                                            register={register}
                                            label={item.label}
                                            error={item.error}
                                            name={item.name}
                                        />
                                    )
                                })}
                        </div>
                        <div title="Personal details" className="md:grid grid-cols-2 items-start gap-10">
                            {
                                workDetails.map((item, index) => {
                                    return (
                                        <InputField<UserModel> key={index}
                                            validateOptions={validationOptions}
                                            register={register}
                                            label={item.label}
                                            error={item.error}
                                            name={item.name}
                                        />
                                    )
                                })}
                        </div>
                        <div title="Registration details" className="md:grid grid-cols-1 items-start gap-10">
                            {
                                registrationDetails.map((item, index) => {
                                    return (
                                        <InputField<UserModel> key={index}
                                            validateOptions={validationOptions}
                                            register={register}
                                            label={item.label}
                                            error={item.error}
                                            name={item.name}
                                        />
                                    )
                                })}
                        </div>

                    </MultiStep>


                    <VSpacer height={100} />
                    <button type="submit"
                        className="btn font-ubuntu cursor-pointer text-xl "
                    >
                        {isSubmitting ? (
                            <span className="flex justify-center items-center gap-2">
                                {" Loading "}
                                <PulseLoader color="white" loading={isSubmitting} size={8} />
                            </span>
                        ) : (
                            "Register User"
                        )}
                    </button>
                </form>
            </div>
            <VSpacer height={100} />
        </div>
    );
};

export default RegisterFragment;
