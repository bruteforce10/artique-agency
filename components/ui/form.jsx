import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";

const Form = FormProvider;

function FormField({ ...props }) {
  return <Controller {...props} />;
}

function FormItem({ className, ...props }) {
  return (
    <div
      className={cn(
        "grid gap-2",
        className
      )}
      {...props}
    />
  );
}

const FormLabel = React.forwardRef(function FormLabel(
  { className, ...props },
  ref
) {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
});

function FormControl({ ...props }) {
  return <Slot {...props} />;
}

const FormDescription = React.forwardRef(function FormDescription(
  { className, ...props },
  ref
) {
  return (
    <p
      ref={ref}
      className={cn("text-muted-foreground text-xs", className)}
      {...props}
    />
  );
});

const FormMessage = React.forwardRef(function FormMessage(
  { className, children, ...props },
  ref
) {
  const {
    formState: { errors },
  } = useFormContext();

  const body = children ?? (props.name && errors?.[props.name]?.message);

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-destructive text-xs font-medium", className)}
      {...props}
    >
      {body}
    </p>
  );
});

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};


