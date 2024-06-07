import React from 'react'
import './Button_Label.css'

interface ButtonProps {
    label: string;
    onClick: () => void;
    type ?: 'button' | 'submit' | 'reset';
    disabled ?: boolean;
}

const Button_Label: React.FC<ButtonProps> = ({ label, onClick, type = 'button', disabled = false }) => {
    return (
        <button
            className = "button"
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button_Label;