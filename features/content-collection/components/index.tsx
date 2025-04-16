import { TextField } from "./text-field";
import { NumberField } from "./number-field";
import { TextareaField } from "./textarea-field";
import { CheckboxField } from "./checkbox-field";
import { DateField } from "./date-field";
import { DateTimeField } from "./datetime-field";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/lib/form-schema";

// Update the interface to accept a form with partial values
interface FieldProps {
  form: UseFormReturn<Partial<FormValues>, any, undefined>;
  field: any;
}

export function FormField({ form, field }: FieldProps) {
  switch (field.type) {
    case "text":
      return (
        <TextField
          form={form}
          id={field.id}
          label={field.label}
          placeholder={field.placeholder}
        />
      );
    case "number":
      return (
        <NumberField
          form={form}
          id={field.id}
          label={field.label}
          min={field.min}
        />
      );
    case "textarea":
      return (
        <TextareaField
          form={form}
          id={field.id}
          label={field.label}
          placeholder={field.placeholder}
        />
      );
    case "checkbox":
      return <CheckboxField form={form} id={field.id} label={field.label} />;
    case "date":
      return <DateField form={form} id={field.id} label={field.label} />;
    case "datetime":
      return <DateTimeField form={form} id={field.id} label={field.label} />;
    default:
      return null;
  }
}
