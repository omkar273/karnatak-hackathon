/* eslint-disable @typescript-eslint/no-unused-vars */
import { VSpacer } from "@/common/components/spacer";
// import TextArea from "@/common/components/text_area";
import { RootState } from '@/common/redux/store';
import useUnderlyingData from "@/fragments/user_management/hooks/useUnderlyingData ";
// import InputField from "@/pages/auth/components/input_field";
import { FileTextOutlined } from "@ant-design/icons";
import { SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
// import { doSaveFIR } from "../utils/do_save_fir";
import { FIRRecord } from "../modals/fir_modal";

const AllFirPage = () => {
  const { handleSubmit, formState: { isSubmitting }, reset } = useForm<FIRRecord>()
  const { currentUser, userdata } = useSelector((state: RootState) => state.auth);

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const { data, loading } = useUnderlyingData(currentUser?.user.uid!)
  const [reload, setreload] = useState(true)

  const [underlyingData, setunderlyingData] = useState<DefaultOptionType[]>([]);

  useEffect(() => {
    underlyingData;
    const optionsData: SelectProps['options'] = [{
      label: userdata?.name,
      value: userdata?.name,
      desc: userdata?.name,
      emoji: '(Self)'
    }]

    if (loading) {
      optionsData.push({
        label: 'Loading...',
        value: 'Loading...',
        desc: 'Loading...',
      })
    }

    data.map((user) => {
      optionsData.push({
        label: user?.name,
        value: user?.name,
        desc: user?.name,
        emoji: user?.post
      })
    })
    setunderlyingData(optionsData);
  }, [loading])

  const onSubmit: SubmitHandler<FIRRecord> = async (data) => {
    try {
      if (isSubmitting) {
        return;
      }

      data
      // await doSaveFIR({ ...data, status: 'registered' });
      toast.success('fir saved sucessfully')
      setreload((prev) => !prev)
      reset()
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  // const handleChange = (value: string[]) => {
  //   setValue('allotedTo', value);
  // };


  // const validationOptions: RegisterOptions = {
  //   required: 'required',
  // }


  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-200">
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
                {/* <InputField<FIRRecord>
                  validateOptions={validationOptions}
                  register={register}
                  label="Name"
                  error={errors.name?.message}
                  name="name"
                />

                <InputField<FIRRecord>
                  validateOptions={validationOptions}
                  register={register}
                  label="Father name"
                  error={errors.fatherName?.message}
                  name="fatherName"
                />

                <InputField<FIRRecord>
                  validateOptions={validationOptions}
                  register={register}
                  label="Mobile No*"
                  error={errors.mobileNo?.message}
                  name="mobileNo"
                />

                <InputField<FIRRecord>
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
                /> */}


                {/* <div className="my-3">
                  <Controller
                    name="allotedTo"
                    control={control}
                    defaultValue={['omkar']}
                    rules={{ required: 'Please select user(s) to allot this case' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        mode="multiple"
                        className="w-full h-12 text-black"
                        allowClear={true}
                        placeholder="Select user to allot this case"
                        onChange={handleChange}
                        options={underlyingData}
                        optionRender={(option) => (
                          <Space>
                            <span role="img" aria-label={option.data.label}>
                              {option.data.emoji}
                            </span>
                            {option.data.desc}
                          </Space>
                        )}
                      />
                    )}
                  />
                  <p className="mb-3 text-xs text-red-600">{errors.allotedTo?.message}</p>
                </div> */}

              </div>
            </div>

            {/* report information */}
            <div className="flex-1">
              <p className="font-semibold">
                <FileTextOutlined />
                {"Report Information"}
              </p>
              <div className="mt-[2.75rem]">
                {/* <InputField<FIRRecord>
                  validateOptions={validationOptions}
                  register={register}
                  label="Date of incident"
                  error={errors.dateOfIncident?.message}
                  name="dateOfIncident"
                />

                <InputField<FIRRecord>
                  validateOptions={validationOptions}
                  register={register}
                  label="Time of incident"
                  error={errors.timeOfIncident?.message}
                  name="timeOfIncident"
                />

                <InputField<FIRRecord>
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
                /> */}
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
        {/* <FirDetailsTable stationId={stationi} reload={reload} /> */}
        <VSpacer height={100} />
      </div>
    </div>
  );
};

export default AllFirPage;
