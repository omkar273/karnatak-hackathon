import TextArea from "@/common/components/text_area";
import dummyUserData from "@/data/underlying_data";
import InputField from "@/pages/auth/components/input_field";
import { Input, Select } from "antd";
import {
  Controller,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

export type TaskType = {
  task_name: string;
  description: string;
  date_assigning: string; // Assuming this is a string date format
  due_date: string; // Assuming this is a string date format
  priority_level: string;
  officer_name: string;
  current_status: string;
  case_number: string;
  post: string;
  zone: string;
  department: string;
  vehicle_assigned: string;
};

const TasksPage = () => {
  const validationOptions: RegisterOptions = {
    required: "Required",
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TaskType>();

  const submit: SubmitHandler<TaskType> = (data) => {
    // Handle form submission logic here
    toast.success("Task assigned successfully");
    reset();
  };

  const handleChange = (value: string) => {
    setValue("priority_level", value);
  };

  const taskPriorities = ["Low", "Medium", "High"];

  const officerNames = dummyUserData.map((user) => ({
    label: user?.name,
    value: user?.name,
    desc: user?.name,
    emoji: user?.post,
  }));

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"Task Details"}
      </p>
      <div className="p-4">
        <form onSubmit={handleSubmit(submit)}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 card bg-white">
            <InputField<TaskType>
              validateOptions={validationOptions}
              register={register}
              label="Task Name"
              error={errors.task_name?.message}
              name="task_name"
            />

            <TextArea<TaskType>
              validateOptions={validationOptions}
              register={register}
              label="Description"
              error={errors.description?.message}
              name="description"
            />

            <Input
              type="date"
              className="w-full h-12 text-black"
              placeholder="Date of Assigning"
              onChange={(e) => setValue("date_assigning", e.target.value)}
            />

            <Input
              type="date"
              className="w-full h-12 text-black"
              placeholder="Due Date"
              onChange={(e) => setValue("due_date", e.target.value)}
            />

            <div className="my-3">
              <p>Select Priority Level</p>
              <Controller
                name="priority_level"
                control={control}
                rules={{ required: "Please select priority level" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full h-12 text-black"
                    placeholder="Select Priority Level"
                    onChange={handleChange}
                  >
                    {taskPriorities.map((priority) => (
                      <Select.Option key={priority} value={priority}>
                        {priority}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
              <p className="mb-3 text-xs text-red-600">
                {errors.priority_level?.message}
              </p>
            </div>

            <Controller
              name="officer_name"
              control={control}
              rules={{ required: "Please select officer name" }}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  className="w-full h-12 text-black"
                  placeholder="Select Officer(s)"
                  options={officerNames}
                />
              )}
            />
            <InputField<TaskType>
              validateOptions={validationOptions}
              register={register}
              label="Current Status"
              error={errors.current_status?.message}
              name="current_status"
            />

            <InputField<TaskType>
              validateOptions={validationOptions}
              register={register}
              label="Case Number"
              error={errors.case_number?.message}
              name="case_number"
            />

            <InputField<TaskType>
              validateOptions={validationOptions}
              register={register}
              label="Post"
              error={errors.post?.message}
              name="post"
            />

            <InputField<TaskType>
              validateOptions={validationOptions}
              register={register}
              label="Zone"
              error={errors.zone?.message}
              name="zone"
            />

            <InputField<TaskType>
              validateOptions={validationOptions}
              register={register}
              label="Department"
              error={errors.department?.message}
              name="department"
            />

            <InputField<TaskType>
              validateOptions={validationOptions}
              register={register}
              label="Vehicle Assigned"
              error={errors.vehicle_assigned?.message}
              name="vehicle_assigned"
            />
          </div>

          <button type="submit" className="btn">
            Assign Task
          </button>
        </form>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default TasksPage;
