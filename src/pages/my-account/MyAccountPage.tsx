import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCog, FaEdit, FaUserCheck, FaSignOutAlt } from 'react-icons/fa';
import GeneralTab from "./components/GeneralTab";
import UpdateDataTab from "./components/UpdateDataTab";
import PreferencesTab from "./components/PreferencesTab";
import type { PreferencesData } from "./components/PreferencesTab";
import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout";
import Modal from "@/components/Modal";
import { validatePassword, validateConfirmPassword, validateAdoptionPreferences } from "@/lib/validators";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Tab = 'geral' | 'atualizar-dados' | 'preferencias';

type ModalState = {
  type: 'none' | 'saveSuccess' | 'deleteConfirm' | 'changePassword';
  message?: string;
}

function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('geral');
  const [modalState, setModalState] = useState<ModalState>({ type: 'none' });
  const navigate = useNavigate();

  // Estados principais
  const [generalSettingsData, setGeneralSettingsData] = useState({
    idioma: 'pt-br',
    tema: 'claro',
  });

  const [preferencesData, setPreferencesData] = useState<PreferencesData>({
    notifications: { email: true, newAnimals: true, appointments: false, whatsapp: false },
    privacy: { showFullName: true, showLocation: true, allowDirectMessages: false },
    adoption: {
        animalTypes: { "Cachorro": true, "Gato": false, "Outros animais": false },
        sexo: "Fêmea", porte: "Médio", idade: "Adulto",
    }
  });
  
  // Estados de rascunho 
  const [draftGeneralSettingsData, setDraftGeneralSettingsData] = useState(generalSettingsData);
  const [draftPreferencesData, setDraftPreferencesData] = useState<PreferencesData>(preferencesData);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  
  useEffect(() => {
    setDraftGeneralSettingsData(generalSettingsData);
    setDraftPreferencesData(preferencesData);
  }, [activeTab]);

  // Estados de erro
  const [preferencesErrors, setPreferencesErrors] = useState({
    adoption: { animalTypes: "", sexo: "", porte: "", idade: "" }
  });
  const [passwordErrors, setPasswordErrors] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  const handleLogout = () => {
    console.log("Usuário deslogado.");
    navigate('/');
  };

  // Funções de salvamento 
  const handleSaveGeneralSettings = () => {
    setGeneralSettingsData(draftGeneralSettingsData);
    console.log("Salvando configurações gerais:", draftGeneralSettingsData);
    openSaveModal("Suas configurações gerais foram salvas.");
  };

  const handleSavePreferences = () => {
      const validationResult = validateAdoptionPreferences(draftPreferencesData.adoption);
      setPreferencesErrors({ adoption: validationResult });

      const hasErrors = Object.values(validationResult).some(errorMsg => errorMsg !== "");

      if (!hasErrors) {
          setPreferencesData(draftPreferencesData);
          console.log("Salvando preferências (válido):", draftPreferencesData);
          openSaveModal("Suas preferências foram salvas com sucesso.");
      } else {
          console.log("Formulário de preferências inválido.");
      }
  };

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setDraftGeneralSettingsData(prev => ({ ...prev, [id]: value }));
  };

  const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;    
    const sectionElement = e.target.closest('section');
    if (!sectionElement) return;
    const section = sectionElement.dataset.section as keyof typeof preferencesData;
    
    setDraftPreferencesData(prev => {
        const newSectionState = JSON.parse(JSON.stringify(prev[section]));
        if (type === 'radio') {
            (newSectionState as any)[name] = value;
        } else if (type === 'checkbox') {
            if (name === 'animalTypes') {
                (newSectionState as any).animalTypes[value] = checked;
            } else {
                (newSectionState as any)[name] = checked;
            }
        }
        return { ...prev, [section]: newSectionState };
    });
  }; 

  const openSaveModal = (message: string) => setModalState({ type: 'saveSuccess', message });
  const openDeleteModal = () => setModalState({ type: 'deleteConfirm' });
  const openChangePasswordModal = () => setModalState({ type: 'changePassword' });
  
  const closeModal = () => {
    setModalState({ type: 'none' });   
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordErrors({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPreferencesErrors({ adoption: { animalTypes: "", sexo: "", porte: "", idade: "" } });
  };
  
  const handleDeleteConfirm = () => {
    console.log("Conta excluída!");
    closeModal();
    navigate('/');
  };
  
  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleChangePasswordConfirm = () => {
    const currentPasswordError = !passwordData.currentPassword ? "Senha atual é obrigatória." : "";
    const newPasswordError = validatePassword(passwordData.newPassword);
    const confirmPasswordError = validateConfirmPassword(passwordData.newPassword, passwordData.confirmPassword);
    
    setPasswordErrors({ currentPassword: currentPasswordError, newPassword: newPasswordError || "", confirmPassword: confirmPasswordError || "" });

    if (!currentPasswordError && !newPasswordError && !confirmPasswordError) {
      console.log("Senha válida, alterando...");
      closeModal();  
      openSaveModal("Sua senha foi alterada com sucesso.");
    }
  };

  const navItems = [
    { id: 'geral', icon: <FaCog className="text-blue" />, text: 'Geral' },
    { id: 'atualizar-dados', icon: <FaEdit className="text-blue" />, text: 'Atualizar Dados' },
    { id: 'preferencias', icon: <FaUserCheck className="text-blue" />, text: 'Preferências' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'geral': 
        return <GeneralTab 
                  settingsData={draftGeneralSettingsData}
                  onSettingsChange={handleGeneralSettingsChange}
                  onSave={handleSaveGeneralSettings}
                  onOpenDeleteModal={openDeleteModal} 
                />
      case 'atualizar-dados': 
        return <UpdateDataTab 
                  onOpenSaveModal={openSaveModal} 
                  onOpenChangePasswordModal={openChangePasswordModal} 
                />
      case 'preferencias': 
        return <PreferencesTab 
                  preferencesData={draftPreferencesData}
                  onPreferencesChange={handlePreferencesChange}
                  onSave={handleSavePreferences}
                  errors={preferencesErrors}
                />
      default: 
        return null;
    }
  }

  return (
    <>
      <PageWithHeaderLayout title="Minha Conta">
         <section className="max-w-5xl mx-auto py-12 px-4 sm:px-8 font-raleway bg-white rounded-lg shadow mt-10">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start">
            <nav className="flex flex-col gap-1">
              {navItems.map(item => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'secondary' : 'ghost'}
                  className="justify-start h-10"
                  onClick={() => setActiveTab(item.id as Tab)}
                >
                  {item.icon} {item.text}
                </Button>
              ))}
              <Button
                variant="ghost"
                className="justify-start h-10 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Sair
              </Button>
            </nav>
            <Card>
              <CardContent className="p-6">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </section>
      </PageWithHeaderLayout>

      <Modal isOpen={modalState.type === 'saveSuccess'} onClose={closeModal} title="Sucesso!">
        <p>{modalState.message || "Suas alterações foram salvas."}</p>
      </Modal>

      <Modal isOpen={modalState.type === 'deleteConfirm'} onClose={closeModal} title="Excluir Conta" confirmText="Sim, excluir" onConfirm={handleDeleteConfirm} variant="danger">
        <p>Você tem certeza que deseja excluir sua conta? Esta ação é irreversível.</p>
      </Modal>
      
      <Modal isOpen={modalState.type === 'changePassword'} onClose={closeModal} title="Alterar Senha" confirmText="Salvar Nova Senha" onConfirm={handleChangePasswordConfirm}>
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Senha Atual</Label>          
            <Input id="currentPassword" type="password" placeholder="********" value={passwordData.currentPassword} onChange={handlePasswordInputChange} />
            {passwordErrors.currentPassword && <p className="text-xs text-destructive">{passwordErrors.currentPassword}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newPassword">Nova Senha</Label>
            <Input id="newPassword" type="password" placeholder="********" value={passwordData.newPassword} onChange={handlePasswordInputChange} />          
            {passwordErrors.newPassword && <p className="text-xs text-destructive">{passwordErrors.newPassword}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
            <Input id="confirmPassword" type="password" placeholder="********" value={passwordData.confirmPassword} onChange={handlePasswordInputChange} />
            {passwordErrors.confirmPassword && <p className="text-xs text-destructive">{passwordErrors.confirmPassword}</p>}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default MyAccountPage;