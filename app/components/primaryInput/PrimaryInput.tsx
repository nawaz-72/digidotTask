import React from "react";

interface InputProps {
  label: string;
  value: string;
  placeholder: string;
  color: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PrimaryInput: React.FC<InputProps> = ({
  label = "",
  value = "",
  placeholder = "",
  color = "black",
  name = "",
  onChange = () => {},
}) => {
  return (
    <div className="w-full flex justify-start items-center gap-2">
      <p className="text-[11px] xl:text-xs font-medium min-w-[102px] font-dm-sans">{label}</p>
      <textarea
        placeholder={placeholder}
        style={{color}}
        className={`bg-white w-[80%] h-[43px] xl:h-full py-2 px-3 font-dm-sans text-xs xl:text-sm rounded-lg outline-none resize-none`}
        name={name}
        // value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PrimaryInput;
