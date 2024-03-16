import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

const LoadingPage = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    const word = "Capital Tech ";
    let index = 0;

    const interval = setInterval(() => {
      if (index < word.length) {
        setText(word.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#002D71] pg flex flex-col justify-center items-center">
      <p className="text-5xl text-white font-fira-sans mb-6">{text}</p>

      <div className="flex items-center">
        <ScaleLoader color="white" loading={true} />
      </div>
    </div>
  );
};

export default LoadingPage;
