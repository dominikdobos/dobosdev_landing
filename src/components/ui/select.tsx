import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
  id?: string
  name?: string
  required?: boolean
}

interface SelectOptionProps {
  value: string
  children: React.ReactNode
}

const SelectContext = React.createContext<{
  value?: string
  onChange?: (value: string) => void
} | null>(null)

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onChange, placeholder, children, className, disabled, id, name, required }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Handle refs
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (newValue: string) => {
      onChange?.(newValue)
      setIsOpen(false)
    }

    // Find selected label
    const selectedChild = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && (child as React.ReactElement<SelectOptionProps>).props.value === value
    ) as React.ReactElement<SelectOptionProps> | undefined

    const selectedLabel = selectedChild ? selectedChild.props.children : placeholder

    return (
      <SelectContext.Provider value={{ value, onChange: handleSelect }}>
        <div className={cn("relative w-full", className)} ref={containerRef}>
          {/* Hidden input for form submission */}
          <input 
            type="hidden" 
            name={name} 
            id={id} 
            value={value || ""} 
            required={required}
            disabled={disabled}
          />
          
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <span className="truncate">{selectedLabel}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>

          {isOpen && (
            <div className="absolute z-50 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 mt-1">
              <div className="p-1 max-h-[200px] overflow-y-auto no-scrollbar">
                {children}
              </div>
            </div>
          )}
        </div>
      </SelectContext.Provider>
    )
  }
)
Select.displayName = "Select"

const SelectItem = ({ value, children }: SelectOptionProps) => {
  const context = React.useContext(SelectContext)
  const isSelected = context?.value === value

  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected && "bg-accent text-accent-foreground"
      )}
      onClick={() => context?.onChange?.(value)}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </span>
      )}
      {children}
    </div>
  )
}

export { Select, SelectItem }
