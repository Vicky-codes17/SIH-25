import { ArrowLeft } from "lucide-react"
import { Button } from "./button"

export function BackButton({ onBack, label = "Back to Dashboard" }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onBack} // Always use the onBack prop
      className="flex items-center gap-2"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  )
}