import { useState } from "react";
import { validatePassword } from "@/lib/validators";
import { toast } from "sonner";
import { userService } from "@/services/userService";
import { useUser } from "./useUser";

type UsePasswordChangeProps = {
  onSaveSuccess: (message: string) => void;
};

export const usePasswordChange = ({ onSaveSuccess }: UsePasswordChangeProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const { user } = useUser();

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

  const handleChangePassword = async () => {
    const newErrors = { currentPassword: "", newPassword: "" };
    let hasError = false;

    if (!currentPassword) {
      newErrors.currentPassword = "A senha atual é obrigatória.";
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

    if (!user?.id) {
      toast.error("Usuário não encontrado");
      return;
    }

    setIsLoading(true);
    try {
      const result = await userService.changePassword(user.id, {
        currentPassword,
        newPassword
      });

      if (result.success) {
        const successMessage = "Sua senha foi alterada com sucesso!";
        toast.success(successMessage);
        onSaveSuccess(successMessage);
        setCurrentPassword("");
        setNewPassword("");
      } else {
        toast.error(result.error || "Erro ao alterar senha");
      }
    } catch (error) {
      toast.error("Erro ao alterar senha");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentPassword,
    newPassword,
    errors,
    isLoading,
    handleChangePassword,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
  };
};