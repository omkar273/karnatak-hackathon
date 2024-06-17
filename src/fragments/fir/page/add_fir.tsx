import AddFIRForm from "@/fragments/station/components/add_fir_form.tsx";

const AddFir = () => {
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Add FIR"}
			</p>
			<div className="p-4 pb-24">
				<AddFIRForm/>
			</div>
		</div>
	)
}
export default AddFir
