import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

import { createPortal } from "react-dom"

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Content wrapper */}
      <div className="relative z-[100] w-full flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full">{children}</div>
      </div>
    </div>,
    document.body
  )
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative mx-auto flex flex-col",
          "w-full h-[100dvh] md:h-auto md:max-h-[85vh] md:max-w-4xl rounded-lg",
          "bg-background shadow-lg",
          "md:my-8",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-between p-6 pb-4 border-b sticky top-0 bg-background z-10 rounded-t-lg",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn("text-2xl font-bold", className)}
    {...props}
  />
)
DialogTitle.displayName = "DialogTitle"

const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
)
DialogDescription.displayName = "DialogDescription"

const DialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex-1 overflow-y-auto p-6 no-scrollbar", className)}
    {...props}
  />
)
DialogBody.displayName = "DialogBody"

const DialogClose = ({
  onClick,
  className,
}: {
  onClick?: () => void
  className?: string
}) => (
  <button
    onClick={onClick}
    className={cn(
      "rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:pointer-events-none",
      className
    )}
  >
    <X className="h-5 w-5" />
    <span className="sr-only">Close</span>
  </button>
)
DialogClose.displayName = "DialogClose"

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogClose,
}

