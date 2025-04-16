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

interface NumberFieldProps {
  form: UseFormReturn<Partial<FormValues>, any, undefined>;
  id: string;
  label: string;
  min?: number;
}

export function NumberField({ form, id, label, min = 0 }: NumberFieldProps) {
  return (
    <FormField
      control={form.control}
      name={id as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type="number" min={min} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
