import { VSpacer } from "@/common/components/spacer";
import { FC } from "react";

const InputField: FC<{
  label?: string | undefined;
  hint?: undefined | string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({ label = "", hint = "", onChange }) => {
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
        type="text"
        className="w-full bg-white md:bg-gray-200 p-4 rounded-md md:bg-opacity-50 mb-3 active:border-none"
        id={label}
        placeholder={hint}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
