import { useState } from "react";
import { validatePassword } from "@/lib/validators";
import { toast } from "sonner";

type UsePasswordChangeProps = {
  onSaveSuccess: (message: string) => void;
};

export const usePasswordChange = ({ onSaveSuccess }: UsePasswordChangeProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
    if (errors.currentPassword) {
      setErrors(prev => ({ ...prev, currentPassword: "" }));
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (errors.newPassword) {
      setErrors(prev => ({ ...prev, newPassword: "" }));
    }
  };

  const handleChangePassword = () => {
    const newErrors = { currentPassword: "", newPassword: "" };
    let hasError = false;

    const FAKE_CORRECT_PASSWORD = "senha123";
    if (!currentPassword) {
      newErrors.currentPassword = "A senha atual é obrigatória.";
      hasError = true;
    } else if (currentPassword !== FAKE_CORRECT_PASSWORD) {
      newErrors.currentPassword = "A senha atual está incorreta.";
      hasError = true;
    }
    
    const passwordStrengthError = validatePassword(newPassword);
    if (passwordStrengthError) {
      newErrors.newPassword = passwordStrengthError;
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    const successMessage = "Sua senha foi alterada com sucesso!";
    toast.success(successMessage);
    onSaveSuccess(successMessage);
    setCurrentPassword("");
    setNewPassword("");
  };

  return {
    currentPassword,
    newPassword,
    errors,
    handleChangePassword,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
  };
};