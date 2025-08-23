"use client";

import { Button } from "@/app/templates/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/app/templates/dialog";
import { Description, Field, Label } from "@/app/templates/fieldset";
import { Input } from "@/app/templates/input";
import { Text } from "@/app/templates/text";
import { Textarea } from "@/app/templates/textarea";
import { useState } from "react";
import { TurnstileStatus } from "./GetSheetsDialog"; // Assuming this path is correct
import { Turnstile } from "next-turnstile";
import { useAlert } from "@/app/contexts/AlertContext";

// Validation rules type
type BaseValidationRule = {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
};

type ValidationRules = {
  name: BaseValidationRule;
  email: BaseValidationRule;
  message: BaseValidationRule;
};

const VALIDATION_RULES: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  message: {
    required: true,
    minLength: 5, 
  },
};

// Form field types
type FormValues = {
  name: string;
  email: string;
  message: string;
};

// Form errors type
type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

// Form touched fields type
type TouchedFields = Record<keyof FormValues, boolean>;

const DEFAULT_FORM_VALUES: FormValues = {
  name: "",
  email: "",
  message: "",
};

const DEFAULT_FORM_ERRORS: FormErrors = {};

const DEFAULT_FORM_TOUCHED: TouchedFields = {
  name: false,
  email: false,
  message: false,
};

// Constant for when all fields need to be marked as touched during validation
const ALL_TOUCHED: TouchedFields = {
  name: true,
  email: true,
  message: true,
};

/**
 * Capitalizes the first letter of a string
 */
const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Validates a single form field based on defined validation rules
 */
const validateField = (name: keyof FormValues, value: string): string | undefined => {
  const rules = VALIDATION_RULES[name];

  if (rules.required && !value.trim()) {
    return `${capitalizeFirstLetter(name)} is required`;
  }

  if (rules.minLength && value.trim().length < rules.minLength) {
    return `${capitalizeFirstLetter(name)} must be at least ${rules.minLength} characters`;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    if (name === "email") {
      return "Please enter a valid email address";
    }
    return `Invalid ${name} format`;
  }

  return undefined;
};

/**
 * Finds the first error message in the errors object
 */
const findFirstErrorMessage = (errors: FormErrors): string | undefined => {
  return Object.values(errors).find(error => error);
};

export default function QuestionDialog() {
  const [turnstileStatus, setTurnstileStatus] =
    useState<TurnstileStatus>("required");
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const { showErrorAlert, showSuccessAlert } = useAlert(); 

  const [formValues, setFormValues] = useState<FormValues>(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>(DEFAULT_FORM_ERRORS);
  const [touched, setTouched] = useState<TouchedFields>(DEFAULT_FORM_TOUCHED);

  const resetForm = () => {
    setFormValues(DEFAULT_FORM_VALUES);
    setTouched(DEFAULT_FORM_TOUCHED);
    setErrors(DEFAULT_FORM_ERRORS);
  };

  const handleOpenDialog = () => {
    resetForm(); // Ensure form is fresh when opened
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    resetForm(); // Also reset form on cancel/close
  };

  // Validate all fields based on current formValues
  const validateForm = (): { isValid: boolean; newErrors: FormErrors } => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formValues) as Array<keyof FormValues>).forEach((field) => {
      const error = validateField(field, formValues[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    return { isValid, newErrors };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as { name: keyof FormValues; value: string };
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target as { name: keyof FormValues };
    setTouched({
      ...touched,
      [name]: true,
    });

    const error = validateField(name, formValues[name]);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched(ALL_TOUCHED); // Mark all fields as touched

    const { isValid: isFormContentValid, newErrors } = validateForm();

    if (!isFormContentValid) {
      const firstError = findFirstErrorMessage(newErrors);
      if (firstError) {
        showErrorAlert(firstError);
      }
      return;
    }


    if (turnstileStatus !== "success") {
      showErrorAlert("We could not verify you are not a robot. Please try submitting the form again.");
      return;
    }

    setIsSending(true);

    const formData = new FormData(event.currentTarget); 
    const token = formData.get("cf-turnstile-response");

    if (!token) {
      alert("We could not verify you are not a robot. Please try submitting the form again.");
      setIsSending(false);
      return;
    }

    const verifyResponse = await fetch("/api/verify-token", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!verifyResponse.ok) {
      showErrorAlert("We could not verify you are not a robot. Please try submitting the form again.");
      setIsSending(false);
      return;
    }

    const { jwt } = await verifyResponse.json();

    if (!jwt) {
      showErrorAlert("We could not verify you are not a robot. Please try submitting the form again.");
      setIsSending(false);
      return;
    }

    // Use validated formValues for name, email, and message
    const data = {
      name: formValues.name,
      email: formValues.email,
      message: formValues.message,
    };

    const response = await fetch("/api/send-question", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to send email");
      showErrorAlert("Something went wrong. Please try to submit again.");
      setIsSending(false);
      return;
    }

    setIsSending(false);
    resetForm(); // Reset form fields and validation states
    setIsOpen(false); // Close dialog
    showSuccessAlert("Your question has been sent successfully! We will be in touch."); // Optional success message
  };

  const isSubmitDisabled =
    isSending ||
    !!errors.name ||
    !!errors.email ||
    !!errors.message ||
    !formValues.name ||
    !formValues.email ||
    !formValues.message;

  return (
    <>
    <div className="flex justify-center md:justify-start">
      <Button 
        type="button" 
        onClick={handleOpenDialog} 
        className=""
      >
        Ask a question
      </Button>
    </div>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        <DialogTitle>Ask a question</DialogTitle>
        <Description>
          Enter your details and query below and we will contact you as soon as
          possible.
        </Description>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <Field>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="John Doe"
                value={formValues.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required // Retain for browser-level cues
              />
              {touched.name && errors.name && (
                <Text className="text-sm mt-1">{errors.name}</Text>
              )}
            </Field>
            <Field className="mt-4">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="john.doe@email.com"
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required // Retain for browser-level cues
              />
              {touched.email && errors.email && (
                <Text className="text-sm mt-1">{errors.email}</Text>
              )}
            </Field>
            <Field className="mt-4">
              <Label>Message</Label>
              <Textarea
                name="message"
                placeholder="Your question or message here..." // Added placeholder
                value={formValues.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required // Retain for browser-level cues
              />
              {touched.message && errors.message && (
                <Text className="text-sm mt-1">{errors.message}</Text>
              )}
            </Field>
            <div className="h-4"> {/* Added mt-4 for spacing consistency */}
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                retry="auto"
                appearance="interaction-only"
                refreshExpired="auto"
                sandbox={process.env.NODE_ENV === "development"}
                theme="auto"
                onError={() => {
                  setTurnstileStatus("error");
                  showErrorAlert("Security check failed. Please try again.");
                }}
                onExpire={() => {
                  setTurnstileStatus("expired");
                  showErrorAlert("Security check expired. Please verify again.");
                }}
                onLoad={() => {
                  setTurnstileStatus("required");
                }}
                onVerify={() => {
                  setTurnstileStatus("success");
                }}
              />
            </div>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitDisabled}>
              {isSending ? "Sending..." : "Send"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
