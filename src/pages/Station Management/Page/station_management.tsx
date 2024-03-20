import TextArea from "@/common/components/text_area";
import InputField from "@/pages/auth/components/input_field";
import { FileTextOutlined } from "@ant-design/icons";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FIRFormErrors, FIRModal } from "../modals/fir_modal";
import { doSaveFIR } from "../utils/do_save_fir";

const FIRPage = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const initialFormValues: FIRModal = {
    name: "",
    fatherName: "",
    mobileNo: "",
    emailAddress: "",
    presentAddress: "",
    dateOfIncident: "",
    timeOfIncident: "",
    placeOfIncident: "",
    detailsOfIncident: "",
  };

  const [formValues, setFormValues] = useState<FIRModal>(initialFormValues);

  const [errors, setErrors] = useState<FIRFormErrors>({
    name: null,
    fatherName: null,
    mobileNo: null,
    emailAddress: null,
    presentAddress: null,
    dateOfIncident: null,
    timeOfIncident: null,
    placeOfIncident: null,
    detailsOfIncident: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const { value } = e.target;
    console.log(`name : ${name} value: ${value}`);

    setFormValues({ ...formValues, [key]: value });
  };

  const handleSubmit = async () => {
    // Perform auto-validation logic
    const newErrors: FIRFormErrors = {
      name: null,
      fatherName: null,
      mobileNo: null,
      emailAddress: null,
      presentAddress: null,
      dateOfIncident: null,
      timeOfIncident: null,
      placeOfIncident: null,
      detailsOfIncident: null,
    };

    let formIsValid = true;

    for (const key in formValues) {
      if (formValues[key as keyof FIRModal].trim() === "") {
        newErrors[key as keyof FIRFormErrors] = "This field is required*";
        formIsValid = false;
      }
    }

    setErrors(newErrors);
    console.log(formValues);

    if (isLoading) {
      return;
    }

    if (formIsValid) {
      setisLoading(true);
      const response = await doSaveFIR(formValues);

      console.log("Form submitted successfully!");
      setisLoading(false);

      if (response) {
        toast.success("Fir details saved successfully");
        setFormValues(initialFormValues);
      }
    } else {
      setisLoading(false);
      console.log("Form contains errors. Please correct them.");
    }
  };

  return (
    <div className="pg">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0">
        {"FIR Management"}
      </p>
      <div className="p-4">
        <div className="card w-full  p-5 bg-white">
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
                <InputField
                  hint="Name"
                  label="Name"
                  required={true}
                  onChange={(e) => handleChange(e, "name")}
                  error={errors.name}
                />

                <InputField
                  hint="Father name"
                  label="Father name"
                  required={true}
                  onChange={(e) => handleChange(e, "fatherName")}
                  error={errors.fatherName}
                />

                <InputField
                  hint="Mobile No*"
                  label="Mobile No*"
                  required={true}
                  onChange={(e) => handleChange(e, "mobileNo")}
                  error={errors.mobileNo}
                />

                <InputField
                  hint="Email Address*"
                  label="Email Address*"
                  required={true}
                  type="email"
                  onChange={(e) => handleChange(e, "emailAddress")}
                  error={errors.emailAddress}
                />

                <TextArea
                  hint="Present Address*"
                  label="Present Address*"
                  required={true}
                  onChange={(e) => handleChange(e, "presentAddress")}
                  error={errors.presentAddress}
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
                <InputField
                  hint="Date of incident"
                  label="Date of incident"
                  required={true}
                  onChange={(e) => handleChange(e, "dateOfIncident")}
                  error={errors.dateOfIncident}
                />

                <InputField
                  hint="Time of incident"
                  label="Time of incident"
                  required={true}
                  onChange={(e) => handleChange(e, "timeOfIncident")}
                  error={errors.timeOfIncident}
                />

                <InputField
                  hint="Place if incident"
                  label="Place if incident"
                  required={true}
                  onChange={(e) => handleChange(e, "placeOfIncident")}
                  error={errors.placeOfIncident}
                />

                <TextArea
                  hint="Details of Incident"
                  label="Details of Incident"
                  required={true}
                  onChange={(e) => handleChange(e, "detailsOfIncident")}
                  error={errors.detailsOfIncident}
                />
              </div>
            </div>
          </div>
          <div
            className="btn font-ubuntu cursor-pointer text-xl "
            onClick={handleSubmit}
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                {" Loading "}
                <PulseLoader color="white" loading={isLoading} size={8} />
              </span>
            ) : (
              "Submit FIR"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FIRPage;