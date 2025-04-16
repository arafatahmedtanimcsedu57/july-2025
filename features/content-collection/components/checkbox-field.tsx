import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Checkbox } from "@/shared/ui/checkbox";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/lib/form-schema";

interface CheckboxFieldProps {
  form: UseFormReturn<Partial<FormValues>, any, undefined>;
  id: string;
  label: string;
}

export function CheckboxField({ form, id, label }: CheckboxFieldProps) {
  return (
    <FormField
      control={form.control}
      name={id as any}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
