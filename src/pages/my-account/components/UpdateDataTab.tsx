import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateDataForm } from "@/hooks/useUpdateDataForm";
import RoundButton from "@/components/RoundButton";

type UpdateDataTabProps = {
  onSaveSuccess: () => void;
}

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
    <form className="flex flex-col gap-6 font-raleway">
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
        >
          Alterar Foto
        </Button>
      </div>
      
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" value={formData.nome} onChange={handleChange} />
          {errors.nome && <p className="text-xs text-destructive">{errors.nome}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sobrenome">Sobrenome</Label>
          <Input id="sobrenome" value={formData.sobrenome} onChange={handleChange} />
          {errors.sobrenome && <p className="text-xs text-destructive">{errors.sobrenome}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div className="grid gap-2">
          <Label htmlFor="dataNascimento">Data de nascimento</Label>
          <Input id="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange} />
           {errors.dataNascimento && <p className="text-xs text-destructive">{errors.dataNascimento}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" type="tel" value={formData.telefone} onChange={handleChange} />
          {errors.telefone && <p className="text-xs text-destructive">{errors.telefone}</p>}
        </div>
      </div>

       <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
       </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
        <div className="grid gap-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input id="endereco" value={formData.endereco} onChange={handleChange} />
             {errors.endereco && <p className="text-xs text-destructive">{errors.endereco}</p>}
        </div>
        <div className="grid gap-2">
            <Label htmlFor="numero">Número</Label>
            <Input id="numero" value={formData.numero} onChange={handleChange} />
             {errors.numero && <p className="text-xs text-destructive">{errors.numero}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="bairro">Bairro</Label>
          <Input id="bairro" value={formData.bairro} onChange={handleChange} />
          {errors.bairro && <p className="text-xs text-destructive">{errors.bairro}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cidade">Cidade</Label>
          <Input id="cidade" value={formData.cidade} onChange={handleChange} />
          {errors.cidade && <p className="text-xs text-destructive">{errors.cidade}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="estado">Estado</Label>
          <Input id="estado" value={formData.estado} onChange={handleChange} />
           {errors.estado && <p className="text-xs text-destructive">{errors.estado}</p>}
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