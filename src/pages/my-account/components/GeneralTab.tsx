import { Label } from "@/components/ui/label";
import RoundButton from "@/components/RoundButton";
import RoundButtonDanger from "@/components/RoundButtonDanger";

type TabProps = {
  settingsData: {
    idioma: string;
    tema: string;
  };
  onSettingsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSave: () => void;
  onOpenDeleteModal: () => void;
}

function GeneralTab({ settingsData, onSettingsChange, onSave, onOpenDeleteModal }: TabProps) {
  return (
    <div className="flex flex-col gap-8 h-full font-raleway">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="idioma">Idioma</Label>
          <select
            id="idioma"
            value={settingsData.idioma}
            onChange={onSettingsChange}
            className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <option value="pt-br">Português (Brasil)</option>
            <option value="en">Inglês</option>
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tema">Tema</Label>
          <select
            id="tema"
            value={settingsData.tema}
            onChange={onSettingsChange}
            className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
          </select>
        </div>
      </div>

      <div className="mt-auto flex justify-end">
        <RoundButton text="Salvar Alterações" color="blue" onClick={onSave} />
      </div>

      <div className="mt-4 flex items-center justify-between p-4 border border-red-300 rounded-md">
        <p className="font-medium text-sm">Excluir Minha Conta</p>
        <div className="w-40" onClick={onOpenDeleteModal}>
          <RoundButtonDanger text="EXCLUIR" />
        </div>
      </div>
    </div>
  )
}
export default GeneralTab;