/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { cn } from "@/utils/cn";
import { Eye, EyeOff } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  className?: string;
  type?: string;
  placeholder?: string;
}

const InventoryInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, placeholder, className, type = "text", ...props }: InputProps) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    console.log("InventoryInput errors:", errors[name]);
    return (
      <div className="w-full space-y-1">
        <div className="relative">
          <input
            id={name}
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "flex h-10 w-full rounded-md border bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              errors[name]
                ? "border-destructive focus-visible:ring-destructive"
                : "border-input hover:border-ring/50",
              className
            )}
            {...register(name!)}
            {...props}
            placeholder={placeholder}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>

        {errors[name] && (
          <p className="text-sm text-destructive">
            {errors[name]?.message as any}
          </p>
        )}
      </div>
    );
  }
);

InventoryInput.displayName = "InventoryInput";

export default InventoryInput;
