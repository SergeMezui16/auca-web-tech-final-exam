import { cn } from "@/lib/cn";

const Spinner = ({ className, size = "md", variant = "default" }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-4",
  };

  const variants = {
    default: "border-primary border-t-transparent",
    secondary: "border-secondary border-t-transparent",
    success: "border-green-500 border-t-transparent",
    danger: "border-red-500 border-t-transparent",
    warning: "border-yellow-500 border-t-transparent",
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full",
        sizes[size],
        variants[variant],
        className
      )}
      role="status"
      aria-label="loading"
    ></div>
  );
};

export default Spinner;