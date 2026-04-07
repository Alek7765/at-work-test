import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './FormInput.module.scss';
import { AlertCircle } from 'lucide-react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={`${styles.wrapper} ${className || ''}`}>
        <label className={styles.label}>{label}</label>
        <div className={styles.inputWrapper}>
          <input 
            ref={ref} 
            className={`${styles.input} ${error ? styles.hasError : ''}`} 
            {...props} 
          />
          {error && <AlertCircle className={styles.errorIcon} />}
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
