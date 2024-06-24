import "./LabelButton.css";

// Component Props
interface ButtonProps {
  // Label String
  label: string;
  // Optional Function Callback
  onClick?: () => void;
  // Optional className
  cssProps?: string;
  // Button Type
  type?: "button" | "submit" | "reset";
  // Optional Status To Disable Button
  disabled?: boolean;
}

function LabelButton({ label, onClick, cssProps = "button", type, disabled }: ButtonProps) {
  return (
    <button className={` ${cssProps} button`} onClick={onClick} type={type} disabled={disabled}>
      {label}
    </button>
  );
}

export default LabelButton;
