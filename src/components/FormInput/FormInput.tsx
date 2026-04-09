import { InputHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import styles from './FormInput.module.scss';
import clsx from "clsx";
import Button from "@/components/Button/Button.tsx";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, id, error, className, value: propValue, onChange: propOnChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(propValue || '');

    useEffect(() => {
      if (propValue !== undefined && propValue !== value) {
        setValue(propValue);
      }
    }, [propValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      propOnChange?.(e);
    };

    const handleClear = () => {
      setValue('');
      if (propOnChange) {
        const event = {
          target: { value: '' }
        } as React.ChangeEvent<HTMLInputElement>;
        propOnChange(event);
      }
    };

    const hasValue = value && String(value).length > 0;

    return (
      <div className={clsx(styles.field, className)}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <div className={styles.inputWrapper}>
          <input
            id={id}
            ref={ref}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={clsx(styles.input, error && styles.hasError)}
            {...props}
          />
          {hasValue && isFocused && (
            <Button
              className={styles.buttonClear}
              label="Очистить поле"
              iconName="X"
              isLabelHidden
              extraAttrs={{ onClick: handleClear }}
            />
          )}
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';