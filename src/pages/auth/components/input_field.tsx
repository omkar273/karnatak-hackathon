import { VSpacer } from "@/common/components/spacer";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputFieldProps<TFieldValues extends FieldValues> {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  error?: string | null;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  validateOptions?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
}
const InputField = <TFieldValues extends FieldValues>({
  label,
  type = "text",
  error,
  register,
  name,
  validateOptions = {},
}: InputFieldProps<TFieldValues>) => {
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
        placeholder={label}
        {...register(name, validateOptions)}
      />
      <p className="mb-3 text-xs text-red-600">{error}</p>
    </div>
  );
};

export default InputField;
