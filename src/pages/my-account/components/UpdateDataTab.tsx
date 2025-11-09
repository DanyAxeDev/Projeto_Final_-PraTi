import { useState } from "react"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateDataForm } from "@/hooks/useUpdateDataForm";
import RoundButton from "@/components/RoundButton";
import { toast } from "sonner"; 
import { findAddress } from "@/services/cepService"; 
import type { ViaCepResponse } from "@/types/types";
import InputLoader from "@/components/InputLoader"; 

type UpdateDataTabProps = {
  onSaveSuccess: () => void;
};

function UpdateDataTab({ onSaveSuccess }: UpdateDataTabProps) {
  const [isSearching, setIsSearching] = useState(false); 
  const [cepValue, setCepValue] = useState(""); 

  const { 
      formData, 
      errors, 
      isLoading, 
      handleChange, 
      validateAll, 
      handleCancel, 
      saveUserData,
      setFormData, 
      setErrors    
  } = useUpdateDataForm();

  const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 8) {
      value = value.slice(0, 8);    
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5, 8);
    }
    setCepValue(value);

    if ((errors as any).cep) {
        setErrors((prev: typeof errors) => {
            const newErrors = { ...prev };
            delete (newErrors as any).cep;
            return newErrors;
        });
    }
  };

  const searchCep = async () => {
    const cep = cepValue.replace(/\D/g, ''); 
    
    if (cep.length === 0) return;

    if (cep.length === 8) {
      try {
        setIsSearching(true)
        const data: ViaCepResponse = await findAddress(cep)

        if ((data as any).erro) {
            toast.error("CEP não encontrado. Por favor, verifique o número.");
            setErrors((prev: typeof errors) => ({ ...prev, cep: "CEP não encontrado." } as any));
            setFormData(prev => ({
                ...prev,
                address: "",
                neighborhood: "",
                city: "",
                state: ""
            }));
        } else {      
            setErrors((prev: typeof errors) => {
                const newErrors = { ...prev };
                delete (newErrors as any).cep;
                return newErrors;
            });
            setFormData(prev => ({
                ...prev,
                address: data.logradouro,
                neighborhood: data.bairro,
                city: data.localidade,
                state: data.uf
            }));
        }
          
      } catch (e) {
        toast.error("Não foi possível consultar o CEP. Tente novamente.");
        setErrors((prev: typeof errors) => ({ ...prev, cep: "Falha ao consultar o CEP." } as any));
      } finally {
        setIsSearching(false)
      }
    } else if (cep.length > 0 && cep.length < 8) {
        setErrors((prev: typeof errors) => ({ ...prev, cep: "CEP incompleto. Deve ter 8 dígitos." } as any));
    }
  };

  const handleSave = async () => {
    const isFormValid = validateAll();

    let isCepValid = true;
    const cep = cepValue.replace(/\D/g, '');
    if (cep.length === 0) {
        setErrors((prev: typeof errors) => ({ 
            ...prev, 
            cep: "CEP é obrigatório." 
        } as any));
        isCepValid = false;
    }

    if (isFormValid && isCepValid) {
      const success = await saveUserData();
      if (success) {
        onSaveSuccess();
      }
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

      <div className="relative grid gap-2">
        <Label htmlFor="cep">CEP</Label>
        <Input 
            id="cep" 
            placeholder="00000-000" 
            maxLength={9} 
            value={cepValue} 
            onChange={handleCepChange} 
            onBlur={searchCep} 
        />
        {(errors as any).cep && <p className="text-xs text-destructive">{(errors as any).cep}</p>}
        {isSearching && <InputLoader />}
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
        <RoundButton text="Cancelar" color="gray" onClick={handleCancel} disabled={isLoading} />
        <RoundButton text={isLoading ? "Salvando..." : "Salvar"} color="blue" onClick={handleSave} disabled={isLoading} />
      </div>
    </form>
  )
}
export default UpdateDataTab;