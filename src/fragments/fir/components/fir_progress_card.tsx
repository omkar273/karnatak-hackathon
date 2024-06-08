import { DatePicker, DatePickerProps } from "antd";
import { useState } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { VSpacer } from "@/common/components/spacer";
import TextArea from "@/common/components/text_area";
import InputField from "@/pages/auth/components/input_field";
import { FilePlus2, FileText } from "lucide-react";

import { RootState } from "@/common/redux/store";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import useFetchFirProgress from "../hooks/use_fetch_fir_progress";
import useSaveFirProgress from "../hooks/use_save_fir_progress";
import { FirProgressTypeModal } from "../modals/fir_progress_modal";


const ProgressCard = () => {
    const [queryParams] = useSearchParams();
    const id = queryParams.get('id');
    const [reload, setreload] = useState<boolean>(true);
    const { error, loading, progressList } = useFetchFirProgress(id, reload);
    const [toggleAddProgress, setToggleAddProgress] = useState<boolean>(false);
    const { firSavingError, saveProgress, savingLoading } = useSaveFirProgress();
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<FirProgressTypeModal>();

    const { currentUser, userdata } = useSelector((s: RootState) => s.auth)

    const validationOptions: RegisterOptions = {
        required: 'Required field'
    };

    // Handling date change
    const onChange: DatePickerProps['onChange'] = (_date, dateString) => {
        setValue('date', dateString as string, { shouldValidate: true });

    };

    const onSubmit: SubmitHandler<FirProgressTypeModal> = async (data) => {
        try {
            // Here you'd usually call an API to submit your data

            await saveProgress(id, {
                ...data,
                reportedById: currentUser?.user.uid,
                reportedBy: userdata.name
            })

            if (!savingLoading && firSavingError) {
                toast.error(`Submission error: ${error}`);
            }

            toast.success("Progress saved sucessflly")
            setreload((prev) => !prev)
        } catch (error) {
            toast.error(`Submission error: ${error}`);
        }
    };

    return (
        <div className="card ">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-xl">Case Progress</p>
                <span className="tap flex gap-2 bg-blue-500 p-3 rounded-md shadow-md text-white" onClick={() => setToggleAddProgress(prev => !prev)}>
                    <FilePlus2 />
                    Add Progress
                </span>
            </div>

            <VSpacer height={15} />

            <form onSubmit={handleSubmit(onSubmit)} className={`p-4 border transition-all duration-200 ease-in-out ${toggleAddProgress ? '' : 'h-0 p-0 hidden overflow-hidden border-none'}`}>
                <div>
                    <p className="text-base my-2">Select the date at which this progress happened</p>
                    <DatePicker
                        placeholder="Select the date for progress"
                        className="text-black"
                        onChange={onChange}
                        format={'DD/MM/YYYY'} />
                    <p className="mb-3 text-xs text-red-600">{errors.date?.message}</p>
                </div>

                <VSpacer height={20} />

                <InputField<FirProgressTypeModal>
                    label="Title"
                    name="title"
                    register={register}
                    error={errors.title?.message}
                    validateOptions={validationOptions}
                />

                <TextArea<FirProgressTypeModal>
                    label="Description"
                    name="description"
                    register={register}
                    error={errors.description?.message}
                    validateOptions={validationOptions}
                />

                <InputField<FirProgressTypeModal>
                    label="Remarks"
                    name="remarks"
                    register={register}
                    error={errors.remarks?.message}
                    validateOptions={validationOptions}
                />

                <button type="submit" className="btn p-3 my-3">
                    {isSubmitting ? "Saving..." : "Save Progress"}
                </button>
            </form>

            <VSpacer height={15} />

            {/* timeline elecment */}
            {loading &&
                <div className="w-full h-full flex flex-col justify-center items-center py-16 gap-4" >
                    <FadeLoader
                        color="#00edff"
                        loading
                    />
                    <p className="font-semibold">Loading the fir details</p>
                </div>
            }
            {
                error && (
                    <div className="w-full h-full flex flex-col justify-center items-center py-16 gap-4" >
                        <p className="font-semibold ">{error.toString()}</p>
                    </div>
                )
            }

            {
                !error && !loading && (
                    <VerticalTimeline
                        lineColor={'#6b7280'} >
                        {
                            progressList.map((progress) => (
                                <VerticalTimelineElement
                                    dateClassName={'text-black'}
                                    className="vertical-timeline-element--work"
                                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                    icon={<FileText />}
                                    date={progress.date}
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}>
                                    <div className="font-bold text-xl">
                                        Title : {progress.title}
                                    </div>
                                    <p>
                                        Reported by :  {progress.reportedBy}
                                    </p>
                                    <p>
                                        Remarks :  {progress.remarks}
                                    </p>
                                    <p className="w-full bg-blue-800 p-4 rounded-md">
                                        Decription:   {progress.description}
                                    </p>
                                </VerticalTimelineElement>
                            ))
                        }
                    </VerticalTimeline>
                )
            }


        </div>
    );
};

export default ProgressCard;
