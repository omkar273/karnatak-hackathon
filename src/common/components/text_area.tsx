import { VSpacer } from "@/common/components/spacer";
import { ChangeEventHandler, FC } from "react";

const TextArea: FC<{
  label?: string;
  hint?: string;
  required?: boolean;
  error?: string | null;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}> = ({ label = "", hint = "", onChange, required = false, error }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="w-full text-[1rem] text-white md:text-gray-500"
      >
        {label}
      </label>
      <VSpacer height={5} />
      <textarea
        className="w-full bg-white min-h-40 md:bg-gray-200 p-4 rounded-md md:bg-opacity-50 border-none focus:outline-none"
        id={label}
        required={required}
        placeholder={hint}
        onChange={onChange}
      />
      <p className="mb-3 text-xs text-red-600">{error}</p>
    </div>
  );
};

export default TextArea;
