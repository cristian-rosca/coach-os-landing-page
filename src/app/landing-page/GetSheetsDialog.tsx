"use client";

import { useState } from "react";
import { Button, ButtonProps } from "@/app/templates/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/app/templates/dialog";
import { Description, Field, Label } from "@/app/templates/fieldset";
import { Input } from "@/app/templates/input";
import { Text } from "@/app/templates/text";
import { Select } from "@/app/templates/select";
import { Turnstile } from "next-turnstile";
import { useAlert } from "@/app/contexts/AlertContext";

export type TurnstileStatus = "success" | "error" | "expired" | "required";

const FREE_TIER_MESSAGE = `Register your interest in Coach OS - the AI-first fitness coaching platform. Enter your details below for early access to demonstrations and pre-registration updates.`;


// Validation rules type
type BaseValidationRule = {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
};

type ValidationRules = {
  name: BaseValidationRule;
  email: BaseValidationRule;
  clientVolume: BaseValidationRule;
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
  clientVolume: {
    required: true,
  },
};

// Form field types
type FormValues = {
  name: string;
  email: string;
  clientVolume: string;
};

// Form errors type
type FormErrors = {
  name?: string;
  email?: string;
  clientVolume?: string;
};

// Form touched fields type
type TouchedFields = Record<keyof FormValues, boolean>;

const DEFAULT_FORM_VALUES: FormValues = {
  name: "",
  email: "",
  clientVolume: "",
};

const DEFAULT_FORM_ERRORS: FormErrors = {};

const DEFAULT_FORM_TOUCHED: TouchedFields = {
  name: false,
  email: false,
  clientVolume: false,
};

// Constant for when all fields need to be marked as touched during validation
const ALL_TOUCHED: TouchedFields = {
  name: true,
  email: true,
  clientVolume: true,
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
const validateField = (
  name: keyof FormValues,
  value: string
): string | undefined => {
  const rules = VALIDATION_RULES[name];

  if (rules.required && !value.trim()) {
    return `${capitalizeFirstLetter(name)} is required`;
  }

  if (rules.minLength && value.trim().length < rules.minLength) {
    return `${capitalizeFirstLetter(name)} must be at least ${
      rules.minLength
    } characters`;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    if (name === "email") {
      return "Please enter a valid email address";
    }
    return `Invalid ${name} format`;
  }

  if (name === "clientVolume" && rules.required && !value) {
    return "Please select your current client volume";
  }

  return undefined;
};

/**
 * Finds the first error message in the errors object
 */
const findFirstErrorMessage = (errors: FormErrors): string | undefined => {
  return Object.values(errors).find((error) => error);
};

export default function GetSheetsDialog({
  variant,
  buttonColor = "dark/zinc",
}: {
  variant: "hero" | "pricing";
  buttonColor?: ButtonProps["color"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [turnstileStatus, setTurnstileStatus] =
    useState<TurnstileStatus>("required");

  const { showErrorAlert, showSuccessAlert } = useAlert();

  const [formValues, setFormValues] = useState<FormValues>(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>(DEFAULT_FORM_ERRORS);
  const [touched, setTouched] = useState<TouchedFields>(DEFAULT_FORM_TOUCHED);

  const handleCloseDialog = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormValues(DEFAULT_FORM_VALUES);
    setTouched(DEFAULT_FORM_TOUCHED);
    setErrors(DEFAULT_FORM_ERRORS);
  };

  // Validate all fields
  const validateForm = (): { isValid: boolean; newErrors: FormErrors } => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate each field in formValues
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof FormValues;
      value: string;
    };
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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

    // Mark all fields as touched to trigger validation messages for empty fields
    setTouched(ALL_TOUCHED);

    // Validate form fields based on current formValues
    const { isValid: isFormContentValid, newErrors } = validateForm();

    if (!isFormContentValid) {
      const firstError = findFirstErrorMessage(newErrors);
      if (firstError) {
        showErrorAlert(firstError);
      }
      return;
    }

    if (turnstileStatus !== "success") {
      showErrorAlert(
        "We could not verify you are not a robot. Please try submitting the form again."
      );
      return;
    }

    setIsSending(true);

    const formData = new FormData(event.currentTarget); // formData still useful for Turnstile and other non-validated fields
    const token = formData.get("cf-turnstile-response");

    if (!token) {
      showErrorAlert(
        "We could not verify you are not a robot. Please try submitting the form again."
      );
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
      showErrorAlert(
        "We could not verify you are not a robot. Please try submitting the form again."
      );
      setIsSending(false);
      return;
    }

    const { jwt } = await verifyResponse.json();

    if (!jwt) {
      showErrorAlert(
        "We could not verify you are not a robot. Please try submitting the form again."
      );
      setIsSending(false);
      return;
    }

    // Use validated formValues
    const data = {
      name: formValues.name,
      email: formValues.email,
      clientVolume: formValues.clientVolume,
      communicationConsent: true,
    };

    const response = await fetch("/api/coaching-sheet-registration", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      console.error("Something went wrong there. Please try to submit again.");
      showErrorAlert("Something went wrong there. Please try to submit again.");
      setIsSending(false);
      return;
    }

    setIsSending(false);
    resetForm(); // Reset form fields and validation states
    setIsOpen(false); // Close dialog
    showSuccessAlert(
      "Thank you for your interest in Coach OS! You will receive updates on early access and demonstrations."
    );
  };

  const isSubmitDisabled =
    isSending ||
    !!errors.name ||
    !!errors.email ||
    !!errors.clientVolume ||
    !formValues.name ||
    !formValues.email ||
    !formValues.clientVolume;

  return (
    <>
      <Button
        type="button"
        color={buttonColor}
        className={variant === "pricing" ? "w-full" : ""}
        onClick={() => {
          resetForm(); // Ensure form is fresh when opened
          setIsOpen(true);
        }}
      >
Register Interest
      </Button>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          Register for Coach OS Early Access
        </DialogTitle>
        <Description>
          {FREE_TIER_MESSAGE}
        </Description>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <Field>
              <Label>Coach Name</Label>
              <Input
                name="name"
                placeholder="John Doe"
                value={formValues.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required // Retain for browser-level cues, but custom validation handles logic
              />
              {touched.name && errors.name && (
                <Text className="mt-1 text-sm">{errors.name}</Text>
              )}
            </Field>
            <Field className="mt-4">
              <Label>Email Address</Label>
              <Input
                name="email"
                type="email" // Good practice for input type
                placeholder="john.doe@email.com"
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.email && errors.email && (
                <Text className="mt-1 text-sm">{errors.email}</Text>
              )}
            </Field>
            <Field className="mt-4">
              <Label>Current Client Volume</Label>
              <Select
                name="clientVolume"
                value={formValues.clientVolume}
                onChange={(event) => {
                  const changeEvent = {
                    target: { name: "clientVolume", value: event.target.value },
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleChange(changeEvent);
                }}
                onBlur={() => {
                  const event = {
                    target: { name: "clientVolume" },
                  } as React.FocusEvent<HTMLInputElement>;
                  handleBlur(event);
                }}
                required
              >
                <option value="">Select client volume</option>
                <option value="1-10">1-10 clients</option>
                <option value="11-25">11-25 clients</option>
                <option value="26-50">26-50 clients</option>
                <option value="50+">50+ clients</option>
              </Select>
              {touched.clientVolume && errors.clientVolume && (
                <Text className="mt-1 text-sm">{errors.clientVolume}</Text>
              )}
            </Field>
            <div className="h-4">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                retry="auto"
                appearance="interaction-only"
                refreshExpired="auto"
                sandbox={process.env.NODE_ENV === "development"}
                theme="dark"
                onError={() => {
                  setTurnstileStatus("error");
                  showErrorAlert("Security check failed. Please try again.");
                }}
                onExpire={() => {
                  setTurnstileStatus("expired");
                  showErrorAlert(
                    "Security check expired. Please verify again."
                  );
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
            <Button disabled={isSubmitDisabled} type="submit">
              {isSending ? "Loading..." : "Send"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
