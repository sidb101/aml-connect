import React, { type PropsWithChildren } from "react";

type SelectProps = {
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	value?: string;
	className?: string;
};

function Select({ onChange, value, className, children }: PropsWithChildren<SelectProps>) {
	return (
		<select
			onChange={onChange}
			value={value}
			className={`regular-text light-grey-text light-grey-panel ${className}`}
		>
			{children}
		</select>
	);
}

export default Select;
