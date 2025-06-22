import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Alert variants using class-variance-authority for better type safety
const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive:
          'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-50 [&>svg]:text-red-600 dark:[&>svg]:text-red-400',
        success:
          'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-50 [&>svg]:text-green-600 dark:[&>svg]:text-green-400',
        warning:
          'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-50 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400',
        info:
          'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-50 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Icon components for different alert types
const CheckCircleIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ExclamationTriangleIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
);

const XCircleIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const InformationCircleIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const XMarkIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: boolean;
  children?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'default',
      title,
      description,
      dismissible = false,
      onDismiss,
      icon = true,
      children,
      ...props
    },
    ref
  ) => {
    const getIcon = () => {
      if (!icon) return null;
      
      switch (variant) {
        case 'success':
          return <CheckCircleIcon />;
        case 'warning':
          return <ExclamationTriangleIcon />;
        case 'destructive':
          return <XCircleIcon />;
        case 'info':
          return <InformationCircleIcon />;
        default:
          return <InformationCircleIcon />;
      }
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {getIcon()}
        <div className="flex-1">
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight">
              {title}
            </h5>
          )}
          {description && (
            <div className="text-sm [&_p]:leading-relaxed opacity-90">
              {description}
            </div>
          )}
          {children && (
            <div className="mt-2">
              {children}
            </div>
          )}
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute right-2 top-2 rounded-md p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Dismiss alert"
          >
            <XMarkIcon />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// Additional components for more structured alerts
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed opacity-90', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

// Utility function to create quick alerts
export const createAlert = {
  success: (message: string, title?: string) => ({
    variant: 'success' as const,
    title,
    description: message,
  }),
  error: (message: string, title?: string) => ({
    variant: 'destructive' as const,
    title: title || 'Error',
    description: message,
  }),
  warning: (message: string, title?: string) => ({
    variant: 'warning' as const,
    title: title || 'Warning',
    description: message,
  }),
  info: (message: string, title?: string) => ({
    variant: 'info' as const,
    title: title || 'Information',
    description: message,
  }),
};

export { Alert, AlertTitle, AlertDescription, alertVariants };
export type { AlertProps };