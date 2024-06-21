import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {TaskUpdateModel} from "@/types/task_model.ts";

const TaskUpdateForm = () => {
	const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<TaskUpdateModel>();
	const [formVisible, setFormVisible] = useState(true);
	
	const onSubmit: SubmitHandler<TaskUpdateModel> = async (data) => {
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast.success('Task updated successfully!');
			reset();
		} catch (e) {
			toast.error(`Error: ${e}`);
		}
	};
	
	return (
		<div className={'w-full'}>
			{/*<h1 className="text-center  text-3xl font-bold mb-6">Task Update Form</h1>*/}
			
			<div className="flex justify-center mb-6">
				<button
					onClick={() => setFormVisible((prev) => !prev)}
					className="bg-cyan-600 hover:scale-105 transition-all duration-300 px-8 text-white rounded-md py-2"
				>
					{formVisible ? 'Hide Form' : 'Show Form'}
				</button>
			</div>
			
			{formVisible && (
				<div className="flex justify-center">
					<form onSubmit={handleSubmit(onSubmit)}
					      className="border-2 w-full md:w-3/4 lg:w-1/2 rounded-lg p-6 shadow-lg bg-white">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label htmlFor="updated_by_id" className="text-gray-700">Updated By ID</label>
								<input
									id="updated_by_id"
									{...register("updated_by_id", {required: "Updated by ID is required"})}
									type="text"
									className="w-full p-3 border rounded-md mt-1"
								/>
								{errors.updated_by_id && <p className="text-red-500">{errors.updated_by_id.message}</p>}
							</div>
							
							<div>
								<label htmlFor="updated_by_name" className="text-gray-700">Updated By Name</label>
								<input
									id="updated_by_name"
									{...register("updated_by_name", {required: "Updated by name is required"})}
									type="text"
									className="w-full p-3 border rounded-md mt-1"
								/>
								{errors.updated_by_name &&
                                    <p className="text-red-500">{errors.updated_by_name.message}</p>}
							</div>
							
							<div>
								<label htmlFor="start_date_time" className="text-gray-700">Start Date Time</label>
								<input
									id="start_date_time"
									{...register("start_date_time", {required: "Start date time is required"})}
									type="datetime-local"
									className="w-full p-3 border rounded-md mt-1"
								/>
								{errors.start_date_time &&
                                    <p className="text-red-500">{errors.start_date_time.message}</p>}
							</div>
							
							<div>
								<label htmlFor="end_date_time" className="text-gray-700">End Date Time</label>
								<input
									id="end_date_time"
									{...register("end_date_time", {required: "End date time is required"})}
									type="datetime-local"
									className="w-full p-3 border rounded-md mt-1"
								/>
								{errors.end_date_time && <p className="text-red-500">{errors.end_date_time.message}</p>}
							</div>
							
							<div className="col-span-1 sm:col-span-2">
								<label htmlFor="title" className="text-gray-700">Title</label>
								<input
									id="title"
									{...register("title")}
									type="text"
									className="w-full p-3 border rounded-md mt-1"
								/>
							</div>
							
							<div className="col-span-1 sm:col-span-2">
								<label htmlFor="description" className="text-gray-700">Description</label>
								<textarea
									id="description"
									{...register("description", {required: "Description is required"})}
									className="w-full p-3 border rounded-md mt-1"
								/>
								{errors.description && <p className="text-red-500">{errors.description.message}</p>}
							</div>
							
							<div className="col-span-1 sm:col-span-2">
								<label htmlFor="update_date_time" className="text-gray-700">Update Date Time</label>
								<input
									id="update_date_time"
									{...register("update_date_time")}
									type="datetime-local"
									className="w-full p-3 border rounded-md mt-1"
								/>
							</div>
						</div>
						
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full mt-6 py-3 bg-cyan-600 text-white rounded-md hover:scale-105 transition-all duration-300"
						>
							{isSubmitting ? 'Submitting...' : 'Submit'}
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default TaskUpdateForm;
