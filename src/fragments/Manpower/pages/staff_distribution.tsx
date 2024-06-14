import {SubmitHandler, useForm} from "react-hook-form";
import IncidentType from "@/types/incident_type.ts";

const StaffDistribution = () => {
	
	const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<IncidentType>()
	
	const onsubmit:SubmitHandler<IncidentType> = ()=>{}
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Staff Distribution"}
			</p>
			<div className="p-4">
				<form onSubmit={handleSubmit(onsubmit)} className=" p-4 md:p-16">
				
				</form>
			</div>
		</div>
	)
}

export default StaffDistribution
