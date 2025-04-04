"use client";
import type { ParamProps } from "@/lib/types";
import React from "react";

function BrowserInstance({ param }: ParamProps) {
	return <p className="text-xs">{param.name}</p>;
}

export default BrowserInstance;
