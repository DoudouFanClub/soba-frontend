import React from 'react'
import './LabelButton.css'

interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

function LabelButton({ label, onClick, type, disabled }: ButtonProps) {
    return (
        <button
            className="button"
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default LabelButton;