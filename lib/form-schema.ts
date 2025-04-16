import * as z from "zod";

// Define the form schema using Zod
export const formSchema = z.object({
  deviceModel: z.string().min(2, { message: "Device model is required" }),
  photoCount: z.coerce.number().min(0, { message: "Must be 0 or greater" }),
  videoCount: z.coerce.number().min(0, { message: "Must be 0 or greater" }),
  audioCount: z.coerce.number().min(0, { message: "Must be 0 or greater" }),
  otherCount: z.coerce.number().min(0, { message: "Must be 0 or greater" }),
  contentDateTime: z.date({ required_error: "Date and time are required" }),
  fileFormat: z.string().min(1, { message: "File format is required" }),
  contentDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  consent: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to the terms" }),
  submitterName: z.string().min(2, { message: "Name is required" }),
  submitterAddress: z.string().min(5, { message: "Address is required" }),
  submitterMobile: z
    .string()
    .min(10, { message: "Valid mobile number is required" }),
  submissionDate: z.date({ required_error: "Date is required" }),
});

export type FormValues = z.infer<typeof formSchema>;

// Default values for the form - explicitly typed as Partial<FormValues>
export const defaultValues: Partial<FormValues> = {
  deviceModel: "",
  photoCount: 0,
  videoCount: 0,
  audioCount: 0,
  otherCount: 0,
  fileFormat: "",
  contentDescription: "",
  consent: false,
  submitterName: "",
  submitterAddress: "",
  submitterMobile: "",
  // contentDateTime and submissionDate are intentionally undefined initially
};
