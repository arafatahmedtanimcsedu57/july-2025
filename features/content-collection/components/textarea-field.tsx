import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Textarea } from "@/shared/ui/textarea";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/lib/form-schema";

interface TextareaFieldProps {
  form: UseFormReturn<Partial<FormValues>, any, undefined>;
  id: string;
  label: string;
  placeholder?: string;
}

export function TextareaField({
  form,
  id,
  label,
  placeholder,
}: TextareaFieldProps) {
  return (
    <FormField
      control={form.control}
      name={id as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
