import { useState } from "react";
import { validateLogin } from "@/lib/loginValidators";

interface LoginData {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    // Validação em tempo real
    const validationErrors = validateLogin({ ...formData, [id]: value });
    setErrors(validationErrors);
  };

  const handleSubmit = (onSuccess: () => void) => {
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSuccess();
    }
  };

  return { formData, errors, handleChange, handleSubmit };
};
