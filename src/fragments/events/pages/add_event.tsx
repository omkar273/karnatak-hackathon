import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {EventType} from "@/types/event_type.ts";
import {toast} from "react-toastify";
import {addDoc, collection, } from "firebase/firestore";
import {firestore} from "@/firebase/firebase_config.ts";

const AddEventPage = () => {
	const {
		handleSubmit,
		register,
		reset,
		formState: {errors, isSubmitting},
	} = useForm<EventType>();
	
	const [eventFormVisible, setEventFormVisible] = useState(true);
	const [eventID, setEventID] = useState<string | null>(null);
	// const [eventDetails, setEventDetails] = useState<EventType | null>(null);
	// const [loading, setLoading] = useState(false);
	eventID;
	const onSubmit: SubmitHandler<EventType> = async (data) => {
		try {
			const eventsCollectionRef = collection(firestore, 'events');
			const docRef = await addDoc(eventsCollectionRef, data);
			toast.success(`Event registered successfully! Event ID: ${docRef.id}`);
			reset()
			
		} catch (e) {
			// Show error toast
			toast.error(`Error: ${e}`);
		}
	};
	
	return (
		<div>
			<h1 className="w-full text-center text-3xl">Event Permissions</h1>
			
			<div className="w-full my-4 p-4 flex justify-center">
				<div className="w-full md:w-[80%] xl:w-[60%] h-12 gap-2 flex justify-center">
					<input
						onChange={(e) => setEventID(e.target.value)}
						placeholder="Enter Event Permission ID"
						type="text"
						className="flex w-full text-lg rounded-md border border-input bg-gray-100 px-4 py-6 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
					
					<button
						className="flex bg-cyan-600 h-full hover:scale-105 transition-all duration-300 px-8 text-white rounded-md items-center">
						Search
					</button>
					
					<button
						onClick={() => setEventFormVisible((prev) => !prev)}
						className="flex bg-cyan-600 h-full hover:scale-105 transition-all duration-300 px-8 text-white rounded-md items-center text-nowrap"
					>
						Add Event
					</button>
				</div>
			</div>
			{eventFormVisible && (
				<div className="w-full flex justify-center">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="border-2 w-[90%] md:w-[80%] mb-24 rounded-lg p px-4 xl:px-[2.5rem] py-12"
					>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-5">
							<div>
								<p className="text-gray-500 pb-1">Event Head</p>
								<input
									{...register("event_head_name", {required: "Event head name is required"})}
									placeholder="eg: omkar sonawane"
									type="text"
									className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{errors.event_head_name &&
                                    <p className="text-red-500">{errors.event_head_name.message}</p>}
							</div>
							
							<div>
								<p className="text-gray-500 pb-1">Phone</p>
								<input
									{...register("event_head_phone", {required: "Phone number is required"})}
									placeholder="eg: 703xxxxxx8"
									type="text"
									className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{errors.event_head_phone &&
                                    <p className="text-red-500">{errors.event_head_phone.message}</p>}
							</div>
							
							<div>
								<p className="text-gray-500 pb-1">Email</p>
								<input
									{...register("event_head_email", {
										required: "Email is required",
										pattern: {
											value: /^\S+@\S+$/i,
											message: "Entered value does not match email format"
										}
									})}
									placeholder="eg: omkarsonawane@gmail.com"
									type="email"
									className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{errors.event_head_email &&
                                    <p className="text-red-500">{errors.event_head_email.message}</p>}
							</div>
							
							<div>
								<p className="text-gray-500 pb-1">Event Start Date</p>
								<input
									{...register("start_date", {required: "Event start date is required"})}
									placeholder="eg: 22/06/2024"
									type="date"
									className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{errors.start_date && <p className="text-red-500">{errors.start_date.message}</p>}
							</div>
							
							<div>
								<p className="text-gray-500 pb-1">Event End Date</p>
								<input
									{...register("end_date", {required: "Event end date is required"})}
									placeholder="eg: 22/06/2024"
									type="date"
									className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{errors.end_date && <p className="text-red-500">{errors.end_date.message}</p>}
							</div>
							
							<div>
								<p className="text-gray-500 pb-1">Event Start Timing</p>
								<input
									{...register("start_timing", {required: "Event start time is required"})}
									placeholder="eg: 10:00"
									type="time"
									defaultValue="10:00"
									className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{errors.start_timing && <p className="text-red-500">{errors.start_timing.message}</p>}
							</div>
							
							<div>
								<p className="text-gray-500 pb-1">Event End Timing</p>
								<input
									{...register("end_timing", {required: "Event end time is required"})}
									placeholder="eg: 18:00"
									type="time"
									defaultValue="18:00"
									className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{errors.end_timing && <p className="text-red-500">{errors.end_timing.message}</p>}
							</div>
							
							<div>
								<p className="text-gray-500 pb-1">Expected Crowd</p>
								<input
									{...register("no_people_gathering", {required: "Expected crowd is required"})}
									placeholder="eg: 1000"
									type="number"
									className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{errors.no_people_gathering &&
                                    <p className="text-red-500">{errors.no_people_gathering.message}</p>}
							</div>
						</div>
						
						<div className="my-3">
							<p className="text-gray-500 pb-1">Venue</p>
							<textarea
								{...register("venue", {required: "Venue is required"})}
								placeholder="eg: saraf nagar , lane no 2 , banglore"
								className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
							/>
							{errors.venue && <p className="text-red-500">{errors.venue.message}</p>}
						</div>
						
						<div className="my-4">
							<p className="text-gray-500 pb-1">Description</p>
							<textarea
								{...register("description", {required: "Description is required"})}
								placeholder="Description"
								className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
							/>
							{errors.description && <p className="text-red-500">{errors.description.message}</p>}
						</div>
						
						<button
							className="w-full my-6 p-4 bg-cyan-500 text-white text-lg font-semibold rounded-md card"
							type="submit"
							disabled={isSubmitting}
						>
							Submit
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default AddEventPage;
