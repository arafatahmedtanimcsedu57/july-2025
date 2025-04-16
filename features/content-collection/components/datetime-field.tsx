"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/lib/form-schema";

interface DateTimeFieldProps {
  form: UseFormReturn<Partial<FormValues>, any, undefined>;
  id: string;
  label: string;
}

export function DateTimeField({ form, id, label }: DateTimeFieldProps) {
  return (
    <FormField
      control={form.control}
      name={id as any}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP 'at' h:mm a")
                    ) : (
                      <span>Pick date and time</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4 border-b">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </div>
                <div className="p-3 border-t">
                  <div className="flex items-center justify-center space-x-2">
                    <select
                      className="w-16 rounded-md border border-input bg-background px-2 py-1 text-sm"
                      value={
                        field.value ? new Date(field.value).getHours() : "12"
                      }
                      onChange={(e) => {
                        const date = field.value || new Date();
                        const newDate = new Date(date);
                        newDate.setHours(Number.parseInt(e.target.value));
                        field.onChange(newDate);
                      }}
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>
                          {i.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <span>:</span>
                    <select
                      className="w-16 rounded-md border border-input bg-background px-2 py-1 text-sm"
                      value={
                        field.value ? new Date(field.value).getMinutes() : "0"
                      }
                      onChange={(e) => {
                        const date = field.value || new Date();
                        const newDate = new Date(date);
                        newDate.setMinutes(Number.parseInt(e.target.value));
                        field.onChange(newDate);
                      }}
                    >
                      {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i}>
                          {i.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
