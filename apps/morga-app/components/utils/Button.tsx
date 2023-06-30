/* eslint-disable-next-line */
export interface UtilsProps {}

import React from "react";
import { twMerge } from "tailwind-merge";

type Designs = "primary" | "secondary" | "warning" | "danger" | "success";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  design?: Designs;
};

const designClasses = {
  primary: "bg-blue-600 hover:bg-blue-500",
  secondary: "bg-gray-600 hover:bg-gray-500",
  warning: "bg-yellow-600 hover:bg-yellow-500",
  danger: "bg-red-700 hover:bg-red-500",
  success: "bg-green-600 hover:bg-green-500",
};

function getDesignClass(design?: Designs, className?: string) {
  const selectedDesign = design || "primary";

  return twMerge(
    "px-2 py-1 rounded-lg text-lg font-bold",
    designClasses[selectedDesign],
    className
  );
}

export default function Button({
  design,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = getDesignClass(design, className);
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
