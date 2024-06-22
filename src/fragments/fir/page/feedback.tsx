import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {firestore} from "@/firebase/firebase_config.ts";

interface FeedbackModel {
    name: string;
    phone: string;
    email: string;
    feedbackType: string;
    comments: string;
}

const FeedbackPage = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<FeedbackModel>();
    
    const [feedbackFormVisible, setFeedbackFormVisible] = useState(true);
    const [feedbackID, setFeedbackID] = useState<string | null>(null);
    
    const onSubmit: SubmitHandler<FeedbackModel> = async (data) => {
        try {
            const feedbackCollectionRef = collection(firestore, 'feedback');
            const docRef = await addDoc(feedbackCollectionRef, {
                ...data,
                timestamp: serverTimestamp(),
                status: 'Submitted',
            });
            toast.success(`Feedback submitted successfully! Feedback ID: ${docRef.id}`);
            reset();
        } catch (e) {
            toast.error(`Error: ${e}`);
        }
    };
    
    return (
        <div>
            <h1 className="w-full text-center text-3xl">Submit Feedback</h1>
            
            <div className="w-full my-4 p-4 flex justify-center">
                <div className="w-full md:w-[80%] xl:w-[60%] h-12 gap-2 flex justify-center">
                    <input
                        onChange={(e) => setFeedbackID(e.target.value)}
                        placeholder="Enter Feedback ID"
                        type="text"
                        className="flex w-full text-lg rounded-md border border-input bg-gray-100 px-4 py-6 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    
                    <button
                        className="flex bg-cyan-600 h-full hover:scale-105 transition-all duration-300 px-8 text-white rounded-md items-center">
                        Search
                    </button>
                    
                    <button
                        onClick={() => setFeedbackFormVisible((prev) => !prev)}
                        className="flex bg-cyan-600 h-full hover:scale-105 transition-all duration-300 px-8 text-white rounded-md items-center text-nowrap"
                    >
                        Add Feedback
                    </button>
                </div>
            </div>
            {feedbackFormVisible && (
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
                                <p className="text-gray-500 pb-1">Feedback Type</p>
                                <select
                                    {...register("feedbackType", {required: "Feedback type is required"})}
                                    className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select Feedback Type</option>
                                    <option value="complaint">Complaint</option>
                                    <option value="suggestion">Suggestion</option>
                                    <option value="inquiry">Inquiry</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.feedbackType && <p className="text-red-500">{errors.feedbackType.message}</p>}
                            </div>
                            
                            <div>
                                <p className="text-gray-500 pb-1">Comments</p>
                                <textarea
                                    {...register("comments", {required: "Comments are required"})}
                                    placeholder="Your comments"
                                    className="flex w-full text- rounded-md border border-input bg-gray-100 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
                                />
                                {errors.comments && <p className="text-red-500">{errors.comments.message}</p>}
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

export default FeedbackPage;
