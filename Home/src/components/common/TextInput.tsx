type TextInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string | null;
};

export const TextInput = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}: TextInputProps) => {
  return (
    <div className="form-field">
      {label && <label className="form-label">{label}</label>}
      <input
        className={`form-input ${error ? "has-error" : ""}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};
