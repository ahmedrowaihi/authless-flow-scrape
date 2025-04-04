import type { AppNodeMissingInputs } from "@/lib/types";
import type React from "react";
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useState,
} from "react";

type FlowValidationContext = {
	invalidInputs: AppNodeMissingInputs[];
	setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>;
	clearErrors: () => void;
};

export const FlowValidationContext =
	createContext<FlowValidationContext | null>(null);

export function FlowValidationContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>(
		[],
	);

	const clearErrors = () => setInvalidInputs([]);

	return (
		<FlowValidationContext.Provider
			value={{ invalidInputs, setInvalidInputs, clearErrors }}
		>
			{children}
		</FlowValidationContext.Provider>
	);
}
