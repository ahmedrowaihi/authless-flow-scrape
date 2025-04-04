"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ParamProps } from "@/lib/types";
import { useEffect, useId, useState } from "react";

function StringParam({
	param,
	value,
	updateNodeParamValue,
	disabled,
}: ParamProps) {
	const id = useId();
	const [internalValue, setInternalValue] = useState(value);

	useEffect(() => {
		setInternalValue(value);
	}, [value]);

	let InputComponent: React.ElementType = Input;
	if (param.variant === "textarea") InputComponent = Textarea;

	return (
		<div className="space-y-1 p1- w-full">
			<Label htmlFor={id} className="text-xs flex">
				{param.name}
				{param.required && <p className="text-red-400 px-2">*</p>}
			</Label>
			<InputComponent
				id={id}
				className="text-xs"
				value={internalValue}
				placeholder="Enter value here"
				onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
					updateNodeParamValue?.(e.target.value)
				}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setInternalValue(e.target.value)
				}
				disabled={disabled}
			/>
			{param.helperText && (
				<p className="text-muted-foreground px-2">{param.helperText}</p>
			)}
		</div>
	);
}

export default StringParam;
