
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

    return (
        <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                {"FIR Details"}
            </p>
            <div className="p-4" >
                {/* <div className="btn" onClick={saveFir}>Save firs</div> */}
            </div>
        </div>
    )
}

export default TaskAssignmentPage