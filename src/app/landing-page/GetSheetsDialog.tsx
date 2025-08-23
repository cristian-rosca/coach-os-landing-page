"use client";

import { useState } from "react";
import { Field as HeadlessField } from "@headlessui/react";
import { Button, ButtonProps } from "@/app/templates/button";
import { Checkbox } from "@/app/templates/checkbox";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/app/templates/dialog";
import { Description, Field, Label } from "@/app/templates/fieldset";
import { Input } from "@/app/templates/input";
import { Link } from "@/app/templates/link";
import { Text } from "@/app/templates/text";
import { Turnstile } from "next-turnstile";
import { useAlert } from "@/app/contexts/AlertContext";

export type TurnstileStatus = "success" | "error" | "expired" | "required";

const FREE_TIER_MESSAGE = `Enter your name and email below to get instant access to our complete set of free coaching systems.`;

const PREMIUM_TIER_MESSAGE = `Get immediate access to our standard coaching tools while we prepare your Premium features. After submitting, you'll receive the free resources by email, and we'll contact you within 24 hours to set up your 1-month free trial with automated data imports.`;

// Validation rules type
type BaseValidationRule = {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
};

type ValidationRules = {
  name: BaseValidationRule;
  email: BaseValidationRule;
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
};

// Form field types
type FormValues = {
  name: string;
  email: string;
};

// Form errors type
type FormErrors = {
  name?: string;
  email?: string;
};

// Form touched fields type
type TouchedFields = Record<keyof FormValues, boolean>;

const DEFAULT_FORM_VALUES: FormValues = {
  name: "",
  email: "",
};

const DEFAULT_FORM_ERRORS: FormErrors = {};

const DEFAULT_FORM_TOUCHED: TouchedFields = {
  name: false,
  email: false,
};

// Constant for when all fields need to be marked as touched during validation
const ALL_TOUCHED: TouchedFields = {
  name: true,
  email: true,
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

  return undefined;
};

/**
 * Finds the first error message in the errors object
 */
const findFirstErrorMessage = (errors: FormErrors): string | undefined => {
  return Object.values(errors).find((error) => error);
};

export default function GetSheetsDialog({
  isPremium,
  variant,
  buttonColor = "dark/zinc",
}: {
  isPremium: boolean;
  variant: "hero" | "pricing";
  buttonColor?: ButtonProps["color"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false); // For terms and conditions
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
    setChecked(false);
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

    if (!checked) {
      showErrorAlert("Please agree to the terms and conditions");
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
      communicationConsent:
        formData.get("communicationConsent") === "on" ? true : false,
      isPremium,
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
      "You will receive an email with the link to the system shortly."
    );
  };

  const isSubmitDisabled =
    isSending ||
    !checked ||
    !!errors.name ||
    !!errors.email ||
    !formValues.name ||
    !formValues.email;

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
        {isPremium ? "Start Free Trial" : "Get Free Systems"}
      </Button>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {isPremium
            ? "CoachPal 1-Month Free Trial"
            : "Get your CoachPal Free Systems"}
        </DialogTitle>
        <Description>
          {isPremium ? PREMIUM_TIER_MESSAGE : FREE_TIER_MESSAGE}
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
                required // Retain for browser-level cues, but custom validation handles logic
              />
              {touched.name && errors.name && (
                <Text className="mt-1 text-sm">{errors.name}</Text>
              )}
            </Field>
            <Field className="mt-4">
              <Label>Email</Label>
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
            <div className="h-4">
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
            <HeadlessField className="mt-6 flex items-center justify-end gap-2 ">
              <Text>Email me when new tools and resources are released</Text>
              <Checkbox name="communicationConsent" />
            </HeadlessField>
            <HeadlessField className="mt-6 flex items-center justify-end gap-2 ">
              <Text>
                I agree to the{" "}
                <Link
                  className="font-bold text-indigo-600"
                  href={`/privacy-policy`}
                  target="_blank"
                >
                  privacy policy
                </Link>{" "}
                and{" "}
                <Link
                  className="font-bold text-indigo-600"
                  href={`/terms-and-conditions`}
                  target="_blank"
                >
                  terms and conditions
                </Link>
              </Text>
              <Checkbox name="terms" checked={checked} onChange={setChecked} />
            </HeadlessField>
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
