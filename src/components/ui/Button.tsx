import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClass = variant === "primary" ? "btn-primary" : "btn-outline";

  return <button type={type} className={`btn ${variantClass} ${className}`} {...props} />;
}
