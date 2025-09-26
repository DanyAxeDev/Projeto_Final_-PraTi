import { useState, useCallback } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

export const useForm = <T>(
    initialState: T, 
    validate: (values: T) => Partial<Record<keyof T, string>>,
    onSubmitSuccess: (values: T) => void | Promise<void>
) => {
    const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clearErrorOnChange = (fieldName: keyof T) => {
        if (errors[fieldName]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, name, value, type } = e.target;
        const fieldName = (id || name) as keyof T;

        const finalValue = type === 'checkbox' 
            ? (e.target as HTMLInputElement).checked 
            : value;
        
        setFormData(prev => ({ ...prev, [fieldName]: finalValue }));
        clearErrorOnChange(fieldName); 
    }, [errors]);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { id, name, files } = e.target;
        const fieldName = (id || name) as keyof T;
        
        const file = files && files.length > 0 ? files[0] : null;
        setFormData(prev => ({ ...prev, [fieldName]: file as any }));
        clearErrorOnChange(fieldName); 
    }, [errors]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const validationErrors = validate(formData);
        setErrors(validationErrors);

        const isValid = Object.keys(validationErrors).length === 0;

        if (isValid) {
            await Promise.resolve(onSubmitSuccess(formData));
        }
        
        setIsSubmitting(false);
    };

    return {
        formData,
        errors,
        isSubmitting,
        setFormData,
        setErrors,
        handleChange,
        handleFileChange,
        handleSubmit,
    };
};