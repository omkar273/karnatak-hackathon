import { VSpacer } from "@/common/components/spacer";
import { FC } from "react";

const InputField: FC<{
  label?: string | undefined;
  hint?: undefined | string;
  required?: boolean;
  error?: string | null;
  type?: React.HTMLInputTypeAttribute;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({
  label = "",
  hint = "",
  onChange,
  required = false,
  error,
  type = "text",
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="w-full text-[1rem] text-white md:text-gray-500"
      >
        {label}
      </label>
      <VSpacer height={5} />
      <input
        type={type}
        className="w-full bg-white md:bg-gray-200 p-4 rounded-md md:bg-opacity-50  active:border-none  focus:outline-none"
        id={label}
        required={required}
        placeholder={hint}
        onChange={onChange}
      />
      <p className="mb-3 text-xs text-red-600">{error}</p>
    </div>
  );
};

export default InputField;
