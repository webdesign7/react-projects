function Button({ text, onClick, className, icon }) {
    return (
        <button
            className={`p-2 rounded flex items-center justify-center space-x-2 ${className}`}
            onClick={onClick}
        >
            {icon && <span>{icon}</span>}
            <span>{text}</span>
        </button>
    );
}

export default Button;