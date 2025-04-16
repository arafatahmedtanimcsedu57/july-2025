import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/lib/form-schema";

interface TextFieldProps {
  form: UseFormReturn<Partial<FormValues>, any, undefined>;
  id: string;
  label: string;
  placeholder?: string;
}

export function TextField({ form, id, label, placeholder }: TextFieldProps) {
  return (
    <FormField
      control={form.control}
      name={id as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
