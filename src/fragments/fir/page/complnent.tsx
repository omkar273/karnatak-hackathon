import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {firestore} from "@/firebase/firebase_config.ts";

interface ComplaintModel {
    name: string;
    phone: string;
    email: string;
    description: string;
}

const ComplaintPage = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<ComplaintModel>();
    
    const [complaintFormVisible, setComplaintFormVisible] = useState(true);
    const [complaintID, setComplaintID] = useState<string | null>(null);
    
    const onSubmit: SubmitHandler<ComplaintModel> = async (data) => {
        try {
            const complaintsCollectionRef = collection(firestore, 'complaints');
            const docRef = await addDoc(complaintsCollectionRef, {
                ...data,
                timestamp: serverTimestamp(),
                status: 'Submitted',
            });
            toast.success(`Complaint submitted successfully! Complaint ID: ${docRef.id}`);
            reset();
        } catch (e) {
            toast.error(`Error: ${e}`);
        }
    };
    
    return (
        <div>
            <h1 className="w-full text-center text-3xl">Submit a Complaint</h1>
            
            <div className="w-full my-4 p-4 flex justify-center">
                <div className="w-full md:w-[80%] xl:w-[60%] h-12 gap-2 flex justify-center">
                    <input
                        onChange={(e) => setComplaintID(e.target.value)}
                        placeholder="Enter Complaint ID"
                        type="text"
                        className="flex w-full text-lg rounded-md border border-input bg-gray-100 px-4 py-6 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    
                    <button
                        className="flex bg-cyan-600 h-full hover:scale-105 transition-all duration-300 px-8 text-white rounded-md items-center">
                        Search
                    </button>
                    
                    <button
                        onClick={() => setComplaintFormVisible((prev) => !prev)}
                        className="flex bg-cyan-600 h-full hover:scale-105 transition-all duration-300 px-8 text-white rounded-md items-center text-nowrap"
                    >
                        Add Complaint
                    </button>
                </div>
            </div>
            {complaintFormVisible && (
                <div className="w-full flex justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="border-2 w-[90%] md:w-[80%] mb-24 rounded-lg p px-4 xl:px-[2.5rem] py-12"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-5">
                            <div>
                                <p className="text-gray-500 pb-1">Name</p>
                                <input
                                    {...register("name", {required: "Name is required"})}
                                    placeholder="Your Name"
                                    type="text"
                                    className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>
                            
                            <div>
                                <p className="text-gray-500 pb-1">Phone</p>
                                <input
                                    {...register("phone", {required: "Phone number is required"})}
                                    placeholder="Your Phone Number"
                                    type="text"
                                    className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                            </div>
                            
                            <div>
                                <p className="text-gray-500 pb-1">Email</p>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Entered value does not match email format"
                                        }
                                    })}
                                    placeholder="Your Email"
                                    type="email"
                                    className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>
                            
                            <div>
                                <p className="text-gray-500 pb-1">Description</p>
                                <textarea
                                    {...register("description", {required: "Description is required"})}
                                    placeholder="Describe your complaint"
                                    className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
                                />
                                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                            </div>
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

export default ComplaintPage;
