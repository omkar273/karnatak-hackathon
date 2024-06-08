import { VSpacer } from "@/common/components/spacer";
// import InputField from "@/pages/auth/components/input_field";
import { useState } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import StationsTable from "../components/station_table";
import { doSaveStation } from "../utils/do_save_station";

import { StationModel } from '@/fragments/station/models/station_model';
import TextArea from "@/common/components/text_area";



const AddStationPage = () => {
    const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm<StationModel>()

    const [reload, setreload] = useState(true)


    const onSubmit: SubmitHandler<StationModel> = async (data) => {
        try {
            if (isSubmitting) {
                return;
            }

            await doSaveStation(data);
            toast.success('station saved sucessfully')
            setreload((prev) => !prev)
            reset()
        } catch (error) {
            toast.error(`${error}`)
        }

    }

    const stationDetails: {
        label: string,
        error: string | undefined,
        name: "station_incharge_name" | "email" | "stationId" | "district" | "station_incharge" | "crimeRate" | "address" | 'phone' | 'zone_name' | 'zone_code' | 'station_name'
    }[] = [
            {
                label: 'Station Name',
                error: errors.station_name?.message,
                name: 'station_name'
            },
            {
                label: 'Zone code',
                error: errors.zone_code?.message,
                name: 'zone_code'
            },

            {
                label: 'email',
                error: errors.email?.message,
                name: 'email'
            },
            {
                label: 'district',
                error: errors.district?.message,
                name: 'district'
            },
            {
                label: 'station_incharge',
                error: errors.station_incharge_name?.message,
                name: 'station_incharge_name'
            },
            {
                label: 'phone',
                error: errors.phone?.message,
                name: 'phone'
            },

        ]

    const validationOptions: RegisterOptions = {
        required: 'required',
    }
    return (
        <div className="max-h-screen overflow-y-scroll overflow-hidden">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0">
                {"Station Management"}
            </p>
            <div className="p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="card w-full  p-5 bg-white">
                    <p className="font-semibold text-2xl ">Add Station</p>
                    <div className="md:grid md:grid-cols-2 justify-center items-start gap-x-10 ">
                        {/* {
                            stationDetails.map((station, index) => (<InputField<StationModel>
                                key={index}
                                validateOptions={validationOptions}
                                register={register}
                                label={station.label}
                                error={errors[station.name]?.message}
                                name={station.name} />))
                        } */}

                        {stationDetails && (<div></div>)}
                    </div>
                    <TextArea<StationModel>
                        validateOptions={validationOptions}
                        register={register}
                        label={"address"}
                        error={errors.address?.message}
                        name={'address'}
                    />

                    <VSpacer height={50} />
                    <button type="submit"
                        className="btn font-ubuntu cursor-pointer text-xl "
                    >
                        {isSubmitting ? (
                            <span className="flex justify-center items-center gap-2">
                                {" Loading "}
                                <PulseLoader color="white" loading={isSubmitting} size={8} />
                            </span>
                        ) : (
                            "Save Station"
                        )}
                    </button>
                </form>

                <VSpacer height={100} />
                <StationsTable reload={reload} />
                <VSpacer height={100} />
            </div>
        </div>
    );
};

export default AddStationPage;
