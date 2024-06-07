import TextArea from "@/common/components/text_area";
import dummyUserData from "@/data/underlying_data";
import InputField from "@/pages/auth/components/input_field";
import { Select, Space } from "antd";
import { Controller, RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type taskType = {
    // type: 'fir' | 'investigation' | 'patrolling';
    type: string[];
    allotedTo: string[];
    task_title: string;
    details: string,
}

const TaskAssignmentPage = () => {

    // const saveFir = async () => {
    //     try {
    //         dummyFIRData.map(async (data) => {
    //             await doSaveFIR({
    //                 ...data, allotedTo: [
    //                     'Omkar sonawane',
    //                     'Ojas deskhmukh',
    //                     'pranav pansare',
    //                     'Jeet javale',
    //                     'Nisarga lokhande'
    //                 ]
    //             });
    //             toast.success(`Fir saved with title ${data.title}`);
    //         })
    //     } catch (error) {
    //         toast.error(`Error: ${error}`)
    //     }
    // }
    const validationOptions: RegisterOptions = {
        required: 'required',
    }

    const { control, register, handleSubmit, setValue, formState: { errors }, reset } = useForm<taskType>();

    const submit: SubmitHandler<taskType> = () => {
        toast.success('Task assigned successfully')
        reset();
    }

    const handleChange = (value: string[]) => {
        setValue('type', value);
    };

    const handleUnderlyingChange = (value: string[]) => {
        setValue('allotedTo', value);
    };

    const taskTypes = [
        {
            label: 'Fir',
            value: 'Fir',
            desc: 'Fir',
        },
        {
            label: 'Investigation',
            value: 'Investigation',
            desc: 'Investigation',
        },
        {
            label: 'patrolling',
            value: 'patrolling',
            desc: 'patrolling',
        },
    ]

    const underlyingValues = dummyUserData.map((user) => ({
        label: user?.name,
        value: user?.name,
        desc: user?.name,
        emoji: user?.post
    }))


    return (
        <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                {"FIR Details"}
            </p>
            <div className="p-4" >
                {/* <div className="btn" onClick={saveFir}>Save firs</div> */}
                <form onSubmit={handleSubmit(submit)}>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 card bg-white">
                        <div className="my-3">
                            <p>Select the type of task</p>
                            <Controller
                                name="type"
                                control={control}
                                // defaultValue={['omkar']}
                                rules={{ required: 'Please select user(s) to allot this case' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        mode="multiple"
                                        className="w-full h-12 text-black"
                                        allowClear={true}
                                        placeholder="Select the type of task"
                                        onChange={handleChange}
                                        options={taskTypes}
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
                        </div>
                        <div className="my-3">
                            <p>Select the underlyings</p>
                            <Controller
                                name="allotedTo"
                                control={control}
                                // defaultValue={['omkar']}
                                rules={{ required: 'Please select user(s) to allot this case' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        mode="multiple"
                                        className="w-full h-12 text-black"
                                        allowClear={true}
                                        placeholder="Select user to allot this case"
                                        onChange={handleUnderlyingChange}
                                        options={underlyingValues}
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
                        </div>

                        <InputField<taskType>
                            validateOptions={validationOptions}
                            register={register}
                            label="Task Title"
                            error={errors.task_title?.message}
                            name="task_title"
                        />

                        <TextArea<taskType>
                            validateOptions={validationOptions}
                            register={register}
                            label="Task description"
                            error={errors.details?.message}
                            name="details"
                        />
                    </div>

                    <button type="submit" className="btn">
                        Assign task
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TaskAssignmentPage