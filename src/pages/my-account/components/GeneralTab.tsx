import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RoundButton from "@/components/RoundButton";
import RoundButtonDanger from "@/components/RoundButtonDanger";
import { usePasswordChange } from "@/hooks/usePasswordChange";

type GeneralTabProps = {
  onOpenDeleteModal: () => void;
  onSaveSuccess: (message: string) => void;
};

function GeneralTab({ onOpenDeleteModal, onSaveSuccess }: GeneralTabProps) {
  const {
    currentPassword,
    newPassword,
    errors: passwordErrors,
    isLoading: passwordLoading,
    handleChangePassword,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
  } = usePasswordChange({ onSaveSuccess });

  const [deletePassword, setDeletePassword] = useState("");
  const [deletePasswordError, setDeletePasswordError] = useState("");

  const handleDeleteAccount = () => {
    setDeletePasswordError("");
    // simulação: verificação da senha atual
    const FAKE_CORRECT_PASSWORD = "senha123";
    if (!deletePassword) {
      setDeletePasswordError("Informe sua senha para excluir a conta.");
      return;
    }
    if (deletePassword !== FAKE_CORRECT_PASSWORD) {
      setDeletePasswordError("A senha informada está incorreta.");
      return;
    }
    onOpenDeleteModal();
  };

  return (
    <div className="flex flex-col gap-8 font-raleway">
      <h2 className="text-xl font-bold">Geral</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Alterar senha</h3>
          <div className="mt-4 space-y-4">
            <div className="grid gap-2 max-w-xs">
              <Label htmlFor="current-password">Senha atual</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
              {passwordErrors.currentPassword && <p className="text-xs text-destructive">{passwordErrors.currentPassword}</p>}
            </div>
            <div className="grid gap-2 max-w-xs">
              <Label htmlFor="new-password">Nova senha</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              {passwordErrors.newPassword && <p className="text-xs text-destructive">{passwordErrors.newPassword}</p>}
            </div>
            <div className="w-45">
              <RoundButton
                text={passwordLoading ? "Alterando..." : "Alterar Senha"}
                color="blue"
                onClick={handleChangePassword}
                disabled={passwordLoading}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Excluir conta</h3>
          <p className="text-sm text-gray-600 mt-1">Essa ação não poderá ser desfeita.</p>
          <div className="mt-4 space-y-4">
            <div className="grid gap-2 max-w-xs">
              <Label htmlFor="delete-password">Informe sua senha</Label>
              <Input
                id="delete-password"
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />
              {deletePasswordError && <p className="text-xs text-destructive">{deletePasswordError}</p>}
            </div>
            <div className="w-55 cursor-pointer" onClick={handleDeleteAccount}>
              <RoundButtonDanger text="Excluir minha conta" onClick={() => ""} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t mt-4">
        <RoundButton text="Cancelar" color="gray" onClick={() => window.location.reload()} />
        <RoundButton text="Salvar" color="blue" onClick={handleChangePassword} />
      </div>
    </div>
  );
}

export default GeneralTab;