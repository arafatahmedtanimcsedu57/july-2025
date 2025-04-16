"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/shared/ui/use-toast";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Form } from "@/shared/ui/form";
import { FormField as CustomFormField } from "./components";
import { formConfig } from "./form-config";
import { formSchema, defaultValues, type FormValues } from "@/lib/form-schema";

export default function DigitalContentForm() {
  const { toast } = useToast();

  // Explicitly type the form with Partial<FormValues>
  const form = useForm<Partial<FormValues>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    toast({
      title: "Form submitted successfully",
      description: "Your digital content submission has been received.",
    });
  };

  return (
    <div className="p-10">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{formConfig.title}</CardTitle>
          <CardDescription>{formConfig.description}</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit as any)}>
            <CardContent className="space-y-6">
              {formConfig.sections.map((section) => (
                <div key={section.id} className="space-y-4">
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  {section.description && (
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  )}

                  {section.fields.map((field) => {
                    if (field.type === "group" && field.fields) {
                      return (
                        <div
                          key={field.id}
                          className={
                            field.layout === "grid"
                              ? `grid grid-cols-1 gap-4 sm:grid-cols-${
                                  field.gridCols || 2
                                }`
                              : "space-y-4"
                          }
                        >
                          {field.fields.map((subField) => (
                            <CustomFormField
                              key={subField.id}
                              form={form}
                              field={subField}
                            />
                          ))}
                        </div>
                      );
                    }
                    return (
                      <CustomFormField
                        key={field.id}
                        form={form}
                        field={field}
                      />
                    );
                  })}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {formConfig.submitButtonText}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
