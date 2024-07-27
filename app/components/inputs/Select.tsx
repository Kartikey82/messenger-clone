"use client";

import ReactSelect, { Props as ReactSelectProps, OnChangeValue } from "react-select";

interface SelectProps<OptionType> {
  label: string;
  value?: OptionType;
  onChange: (value: OnChangeValue<OptionType, true>) => void;
  options: OptionType[];
  disabled?: boolean;
}

const Select = <OptionType extends { value: string; label: string }>({
  label,
  value,
  onChange,
  options,
  disabled
}: SelectProps<OptionType>) => {
  return ( 
    <div className="z-[100]">
      <label
        className="
          block
          text-sm
          font-medium
          leading-6
          text-gray-900
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect<OptionType, true>
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999
            }),
            control: (base) => ({
              ...base,
              textSize: 'small'
            })
          }}
          classNames={{
            control: () => "text-sm"
          }}
        />
      </div>
    </div>
  );
}

export default Select;
