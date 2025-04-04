import type React from "react";

function NodeIO({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-col divide-y gap-2">{children}</div>;
}

export default NodeIO;
