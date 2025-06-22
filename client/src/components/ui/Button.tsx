import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Button variants using class-variance-authority
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 bg-blue-600 text-white hover:bg-blue-700',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 bg-red-600 text-white hover:bg-red-700',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground border-gray-300 hover:bg-gray-50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 bg-gray-100 text-gray-900 hover:bg-gray-200',
        ghost: 'hover:bg-accent hover:text-accent-foreground hover:bg-gray-100',
        link: 'text-primary underline-offset-4 hover:underline text-blue-600 hover:text-blue-800',
        success:
          'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        warning:
          'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
        info:
          'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-12 rounded-md px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Loading spinner component
const LoadingSpinner = ({ size = 16 }: { size?: number }) => (
  <svg
    className="animate-spin"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <LoadingSpinner
            size={size === 'sm' ? 14 : size === 'lg' || size === 'xl' ? 18 : 16}
          />
        )}
        {!loading && leftIcon && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}
        {!loading && children && (
          <span className={loading ? 'ml-2' : ''}>{children}</span>
        )}
        {loading && children && (
          <span className="ml-2">{children}</span>
        )}
        {!loading && rightIcon && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

// Icon Button component
export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon: React.ReactNode;
  loading?: boolean;
  tooltip?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'ghost',
      size = 'icon',
      icon,
      loading = false,
      tooltip,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isDisabled}
        title={tooltip}
        {...props}
      >
        {loading ? (
          <LoadingSpinner
            size={size === 'sm' ? 14 : size === 'lg' || size === 'xl' ? 18 : 16}
          />
        ) : (
          icon
        )}
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';

// Button Group component
export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'outline';
  size?: 'sm' | 'default' | 'lg';
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      orientation = 'horizontal',
      variant = 'default',
      size = 'default',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          'inline-flex',
          orientation === 'horizontal'
            ? 'flex-row [&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button:not(:first-child)]:border-l-0'
            : 'flex-col [&>button]:rounded-none [&>button:first-child]:rounded-t-md [&>button:last-child]:rounded-b-md [&>button:not(:first-child)]:border-t-0',
          className
        )}
        ref={ref}
        role="group"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement<ButtonProps>(child) && child.type === Button) {
            return React.cloneElement(child, {
              variant: child.props.variant || variant,
              size: child.props.size || size,
            } as Partial<ButtonProps>);
          }
          return child;
        })}
      </div>
    );
  }
);
ButtonGroup.displayName = 'ButtonGroup';

// Floating Action Button component
export interface FABProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'default' | 'lg';
  loading?: boolean;
}

const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      className,
      icon,
      position = 'bottom-right',
      size = 'default',
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const positionClasses = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'top-right': 'top-6 right-6',
      'top-left': 'top-6 left-6',
    };

    const sizeClasses = {
      default: 'h-14 w-14',
      lg: 'h-16 w-16',
    };

    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          'fixed z-50 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-xl',
          positionClasses[position],
          sizeClasses[size],
          'flex items-center justify-center',
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <LoadingSpinner size={size === 'lg' ? 24 : 20} />
        ) : (
          icon
        )}
      </button>
    );
  }
);
FAB.displayName = 'FAB';

// Common icon components
export const ChevronDownIcon = () => (
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
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const PlusIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

export const SearchIcon = () => (
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
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export const EditIcon = () => (
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
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

export const DeleteIcon = () => (
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
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export {
  Button,
  IconButton,
  ButtonGroup,
  FAB,
  buttonVariants,
  LoadingSpinner,
};