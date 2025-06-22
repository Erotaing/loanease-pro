import React, { useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Input variants using class-variance-authority
const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50',
        warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500 bg-yellow-50',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10 px-3',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Label component
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
  }
>(({ className, required, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700',
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
));
Label.displayName = 'Label';

// Helper text component
const HelperText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    variant?: 'default' | 'error' | 'success' | 'warning';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: 'text-gray-600',
    error: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
  };

  return (
    <p
      ref={ref}
      className={cn('text-xs mt-1', variantClasses[variant], className)}
      {...props}
    />
  );
});
HelperText.displayName = 'HelperText';

// Icon wrapper component
const InputIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    position?: 'left' | 'right';
  }
>(({ className, position = 'left', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none',
      position === 'left' ? 'left-3' : 'right-3',
      className
    )}
    {...props}
  />
));
InputIcon.displayName = 'InputIcon';

// Main Input component
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  warning?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      type = 'text',
      label,
      helperText,
      error,
      success,
      warning,
      leftIcon,
      rightIcon,
      required,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    // Determine variant based on validation states
    const computedVariant = error
      ? 'error'
      : success
      ? 'success'
      : warning
      ? 'warning'
      : variant;

    // Generate stable ID if not provided
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;

    // Determine helper text and variant
    const displayHelperText = error || success || warning || helperText;
    const helperVariant = error
      ? 'error'
      : success
      ? 'success'
      : warning
      ? 'warning'
      : 'default';

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}
        <div className="relative">
          {leftIcon && <InputIcon position="left">{leftIcon}</InputIcon>}
          <input
            type={type}
            className={cn(
              inputVariants({ variant: computedVariant, size }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            id={inputId}
            {...props}
          />
          {rightIcon && <InputIcon position="right">{rightIcon}</InputIcon>}
        </div>
        {displayHelperText && (
          <HelperText variant={helperVariant}>{displayHelperText}</HelperText>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

// Textarea component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  warning?: string;
  required?: boolean;
  containerClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      warning,
      required,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    // Generate stable ID if not provided
    const generatedId = useId();
    const textareaId = id || `textarea-${generatedId}`;

    // Determine helper text and variant
    const displayHelperText = error || success || warning || helperText;
    const helperVariant = error
      ? 'error'
      : success
      ? 'success'
      : warning
      ? 'warning'
      : 'default';

    // Determine border color based on validation states
    const borderClass = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50'
      : success
      ? 'border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50'
      : warning
      ? 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500 bg-yellow-50'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <Label htmlFor={textareaId} required={required}>
            {label}
          </Label>
        )}
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical',
            borderClass,
            className
          )}
          ref={ref}
          id={textareaId}
          {...props}
        />
        {displayHelperText && (
          <HelperText variant={helperVariant}>{displayHelperText}</HelperText>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// Select component
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  warning?: string;
  required?: boolean;
  containerClassName?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      warning,
      required,
      containerClassName,
      id,
      placeholder,
      options = [],
      children,
      ...props
    },
    ref
  ) => {
    // Generate stable ID if not provided
    const generatedId = useId();
    const selectId = id || `select-${generatedId}`;

    // Determine helper text and variant
    const displayHelperText = error || success || warning || helperText;
    const helperVariant = error
      ? 'error'
      : success
      ? 'success'
      : warning
      ? 'warning'
      : 'default';

    // Determine border color based on validation states
    const borderClass = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50'
      : success
      ? 'border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50'
      : warning
      ? 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500 bg-yellow-50'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <Label htmlFor={selectId} required={required}>
            {label}
          </Label>
        )}
        <select
          className={cn(
            'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            borderClass,
            className
          )}
          ref={ref}
          id={selectId}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
          {children}
        </select>
        {displayHelperText && (
          <HelperText variant={helperVariant}>{displayHelperText}</HelperText>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Input, Textarea, Select, Label, HelperText, InputIcon, inputVariants };