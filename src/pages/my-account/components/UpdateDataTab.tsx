import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateDataForm } from "@/hooks/useUpdateDataForm";
import RoundButton from "@/components/RoundButton";

type UpdateDataTabProps = {
  onSaveSuccess: () => void;
};

function UpdateDataTab({ onSaveSuccess }: UpdateDataTabProps) {
  const { formData, errors, handleChange, validateAll, handleCancel } = useUpdateDataForm();
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newImageBase64, setNewImageBase64] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
      setPreviewUrl(savedImage);
    }
  }, []);

  const handleEditPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String); 
        setNewImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const isFormValid = validateAll();
    if (isFormValid) {
      if (newImageBase64) {
        localStorage.setItem('userProfileImage', newImageBase64);
        setNewImageBase64(null); 
      }
      console.log("Salvando dados do usuário:", formData);
      onSaveSuccess();
    }
  };

  return (
    <form className="flex flex-col gap-6 font-raleway" onSubmit={(e) => e.preventDefault()}>
      <h2 className="text-xl font-bold">Atualizar Dados</h2>
      <input 
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div className="flex items-center justify-center gap-4">
        <div 
          className="w-20 h-20 bg-muted rounded-full bg-cover bg-center border"
          style={{ 
            backgroundImage: previewUrl ? `url(${previewUrl})` : 'none',
            backgroundColor: previewUrl ? 'transparent' : '#f1f5f9'
          }}
        ></div>
        <Button 
          variant="outline" 
          type="button"
          onClick={handleEditPhotoClick}
          className="cursor-pointer"
        >
          Alterar Foto
        </Button>
      </div>
      
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">Nome</Label>
          <Input id="firstName" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div className="grid gap-2">
          <Label htmlFor="birthDate">Data de nascimento</Label>
          <Input id="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
           {errors.birthDate && <p className="text-xs text-destructive">{errors.birthDate}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>

       <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
       </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
        <div className="grid gap-2">
            <Label htmlFor="address">Endereço</Label>
            <Input id="address" value={formData.address} onChange={handleChange} />
             {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
        </div>
        <div className="grid gap-2">
            <Label htmlFor="number">Número</Label>
            <Input id="number" value={formData.number} onChange={handleChange} />
             {errors.number && <p className="text-xs text-destructive">{errors.number}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input id="neighborhood" value={formData.neighborhood} onChange={handleChange} />
          {errors.neighborhood && <p className="text-xs text-destructive">{errors.neighborhood}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" value={formData.city} onChange={handleChange} />
          {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" value={formData.state} onChange={handleChange} />
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