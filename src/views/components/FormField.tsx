interface FormFieldProps {
  className: string;
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormField = ({
  className,
  id,
  name,
  type,
  label,
  value,
  placeholder,
  onChange,
}: FormFieldProps) => {
  return (
    <div className={className}>
      <label htmlFor={id} className={`${className}-label label`}>
        {label}
      </label>
      {type !== "textarea" ? (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={`${className}-input input`}
        />
      ) : (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={`${className}-input input`}
        />
      )}
    </div>
  );
};

export default FormField;
