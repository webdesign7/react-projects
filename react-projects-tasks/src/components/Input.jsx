function InputField({ type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
        />
    );
}

export default InputField;