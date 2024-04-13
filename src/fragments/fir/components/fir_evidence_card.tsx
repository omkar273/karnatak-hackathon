import { DatePicker, DatePickerProps, Table } from "antd";
import { useState } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { VSpacer } from "@/common/components/spacer";
import TextArea from "@/common/components/text_area";
import InputField from "@/pages/auth/components/input_field";
import { FilePlus2 } from "lucide-react";

import { RootState } from "@/common/redux/store";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import 'react-vertical-timeline-component/style.min.css';
import useFetchFirEvidences from "../hooks/use_get_evidences";
import useSaveFirEvidence from "../hooks/use_save_evidence";
import { FirEvidenceTypeModal } from "../modals/fir_evidence_model";

type columnNameType = {
    title: string,
    key: string,
    dataIndex: string,
}

const EvidencesCard = () => {
    const [queryParams] = useSearchParams();
    const id = queryParams.get('id');
    const [reload, setreload] = useState<boolean>(true);
    const { error, loading, evidenceList } = useFetchFirEvidences(id, reload);
    const [toggleAddProgress, setToggleAddProgress] = useState<boolean>(false);
    const { saveEvidence, evidenceError, savingLoading } = useSaveFirEvidence();
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<FirEvidenceTypeModal>();

    const { currentUser, userdata } = useSelector((s: RootState) => s.auth)

    const validationOptions: RegisterOptions = {
        required: 'Required field'
    };

    // Handling date change
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setValue('date', dateString as string, { shouldValidate: true });
        console.log(dateString, typeof (dateString));

    };

    const onSubmit: SubmitHandler<FirEvidenceTypeModal> = async (data) => {
        try {
            // Here you'd usually call an API to submit your data
            console.log('Submitted Data:', data);

            await saveEvidence(id, {
                ...data,
                reportedById: currentUser?.user.uid,
                reportedBy: userdata.name
            })

            if (!savingLoading && evidenceError) {
                toast.error(`Submission error: ${error}`);
            }

            toast.success("Evidence saved sucessflly")
            setreload((prev) => !prev)
        } catch (error) {
            toast.error(`Submission error: ${error}`);
        }
    };

    const evidenceTableColumns: columnNameType[] = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Reporting Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Reported By',
            dataIndex: 'reportedBy',
            key: 'reportedBy',
        },
        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ]

    return (
        <div className="card ">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-xl">Case Evidences</p>
                <span className="tap flex gap-2 bg-blue-500 p-3 rounded-md shadow-md text-white" onClick={() => setToggleAddProgress(prev => !prev)}>
                    <FilePlus2 />
                    Add Evidence
                </span>
            </div>

            <VSpacer height={15} />

            <form onSubmit={handleSubmit(onSubmit)} className={`p-4 border transition-all duration-200 ease-in-out ${toggleAddProgress ? '' : 'h-0 p-0 overflow-hidden border-none'}`}>
                <div>
                    <p className="text-base my-2">Select the date at which this evidence was collected</p>
                    <DatePicker
                        placeholder="Select the date for progress"
                        className="text-black"
                        onChange={onChange}
                        format={'DD/MM/YYYY'} />
                    <p className="mb-3 text-xs text-red-600">{errors.date?.message}</p>
                </div>

                <VSpacer height={20} />

                <InputField<FirEvidenceTypeModal>
                    label="Title"
                    name="title"
                    register={register}
                    error={errors.title?.message}
                    validateOptions={validationOptions}
                />

                <TextArea<FirEvidenceTypeModal>
                    label="Description"
                    name="description"
                    register={register}
                    error={errors.description?.message}
                    validateOptions={validationOptions}
                />

                <InputField<FirEvidenceTypeModal>
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
                    <Table
                        dataSource={evidenceList}
                        columns={evidenceTableColumns}
                        pagination={{
                            total: evidenceList.length,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

                        }}
                        loading={loading}
                        scroll={{ x: 'max-content' }}
                    />
                )
            }


        </div>
    );
};

export default EvidencesCard;
