import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateDataForm } from "@/hooks/useUpdateDataForm";
import RoundButton from "@/components/RoundButton";

type UpdateDataTabProps = {
  onSaveSuccess: () => void;
};

function UpdateDataTab({ onSaveSuccess }: UpdateDataTabProps) {
  const { formData, errors, handleChange, validateAll, handleCancel } = useUpdateDataForm();

  const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

  const handleSave = () => {
    const isFormValid = validateAll();
    if (isFormValid) {
      console.log("Salvando dados do usuário:", formData);
      onSaveSuccess();
    }
  };

  return (
    <form className="flex flex-col gap-6 font-raleway" onSubmit={(e) => e.preventDefault()}>
      <h2 className="text-xl font-bold">Atualizar Dados</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">Nome</Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="birthDate">Data de nascimento</Label>
          <Input id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
          {errors.birthDate && <p className="text-xs text-destructive">{errors.birthDate}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
        <div className="grid gap-2">
          <Label htmlFor="address">Endereço</Label>
          <Input id="address" name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="number">Número</Label>
          <Input id="number" name="number" value={formData.number} onChange={handleChange} />
          {errors.number && <p className="text-xs text-destructive">{errors.number}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange} />
          {errors.neighborhood && <p className="text-xs text-destructive">{errors.neighborhood}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleChange} />
          {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="state">Estado</Label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>Selecione</option>
            {ufs.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
          {errors.state && <p className="text-xs text-destructive">{errors.state}</p>}
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-6 border-t mt-4">
        <RoundButton text="Cancelar" color="gray" onClick={handleCancel} />
        <RoundButton text="Salvar" color="blue" onClick={handleSave} />
      </div>
    </form>
  )
}
export default UpdateDataTab;