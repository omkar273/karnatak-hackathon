import { VSpacer } from "@/common/components/spacer";
import TextArea from "@/common/components/text_area";
import InputField from "@/pages/auth/components/input_field";
import { FileTextOutlined } from "@ant-design/icons";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import FirDetailsTable from "../components/fir_table";
import { FIRModal } from "../modals/fir_modal";
import { doSaveFIR } from "../utils/do_save_fir";

const FIRPage = () => {
  const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm<FIRModal>()



  const onSubmit: SubmitHandler<FIRModal> = async (data) => {
    try {
      if (isSubmitting) {
        return;
      }

      await doSaveFIR(data);
      toast.success('fir saved sucessfully')
      reset()
    } catch (error) {
      toast.error(`${error}`)
    }

  }

  const validationOptions: RegisterOptions = {
    required: 'required',
  }
  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0">
        {"FIR Management"}
      </p>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="card w-full  p-5 bg-white">
          <div className="md:flex justify-center items-start gap-10">
            {/* fir details  */}
            <div className="flex-1">
              <p className="font-semibold">
                <FileTextOutlined /> {"FIR (Complaint details)"}
              </p>
              <p className="font-bold text-xs mt-3">
                Please fill the form very carefully
              </p>
              <div className="my-3">
                <InputField<FIRModal>
                  validateOptions={validationOptions}
                  register={register}
                  label="Name"
                  error={errors.name?.message}
                  name="name"
                />

                <InputField<FIRModal>
                  validateOptions={validationOptions}
                  register={register}
                  label="Father name"
                  error={errors.fatherName?.message}
                  name="fatherName"
                />

                <InputField<FIRModal>
                  validateOptions={validationOptions}
                  register={register}
                  label="Mobile No*"
                  error={errors.mobileNo?.message}
                  name="mobileNo"
                />

                <InputField<FIRModal>
                  validateOptions={validationOptions}
                  register={register}
                  label="Email Address*"
                  type="email"
                  error={errors.emailAddress?.message}
                  name="emailAddress"
                />


                <TextArea
                  register={register}
                  error={errors.presentAddress?.message}
                  name="presentAddress"
                  label="Present Address*"
                  validateOptions={validationOptions}
                />
              </div>
            </div>

            {/* report information */}
            <div className="flex-1">
              <p className="font-semibold">
                <FileTextOutlined />
                {"  Report Information"}
              </p>
              <div className="mt-[2.75rem]">
                <InputField<FIRModal>
                  validateOptions={validationOptions}
                  register={register}
                  label="Date of incident"
                  error={errors.dateOfIncident?.message}
                  name="dateOfIncident"
                />

                <InputField<FIRModal>
                  validateOptions={validationOptions}
                  register={register}
                  label="Time of incident"
                  error={errors.timeOfIncident?.message}
                  name="timeOfIncident"
                />

                <InputField<FIRModal>
                  validateOptions={validationOptions}
                  register={register}
                  label="Place if incident"
                  error={errors.placeOfIncident?.message}
                  name="placeOfIncident"
                />

                <TextArea
                  register={register}
                  label="Details of Incident"
                  name="detailsOfIncident"
                  validateOptions={validationOptions}
                  error={errors.detailsOfIncident?.message}
                />
              </div>
            </div>
          </div>
          <button type="submit"
            className="btn font-ubuntu cursor-pointer text-xl "
          >
            {isSubmitting ? (
              <span className="flex justify-center items-center gap-2">
                {" Loading "}
                <PulseLoader color="white" loading={isSubmitting} size={8} />
              </span>
            ) : (
              "Submit FIR"
            )}
          </button>
        </form>

        <VSpacer height={100} />
        <FirDetailsTable />
        <VSpacer height={100} />
      </div>
    </div>
  );
};

export default FIRPage;
