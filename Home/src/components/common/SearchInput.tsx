type SearchInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  type?: string;
  placeholder?: string;
  error?: string | null;
};

export const SearchInput = ({
  label,
  value,
  onChange,
  onSearch,
  type,
  placeholder,
  error,
}: SearchInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-input">
      {label && <label className="form-label">{label}</label>}
      <input
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {error && <div className="form-error">{error}</div>}
      <button type="button" onClick={onSearch}>
        검색
      </button>
    </div>
  );
};
