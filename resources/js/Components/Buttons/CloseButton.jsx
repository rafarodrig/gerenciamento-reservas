import { X } from "lucide-react";

export default function CloseButton({ onClick, className = '', ariaLabel }) {
  return (
    <X
      size={16}
      strokeWidth={3}
      className={`close-badge ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      role="button"
    />
  );
}
