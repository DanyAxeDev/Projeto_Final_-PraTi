import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { FaCog, FaUserCheck, FaSlidersH } from 'react-icons/fa';
import GeneralTab from "./components/GeneralTab";
import UpdateDataTab from "./components/UpdateDataTab";
import PreferencesTab from "./components/PreferencesTab";
import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout";
import Modal from "@/components/Modal";
import { usePreferencesForm } from "@/hooks/usePreferencesForm";

type Tab = 'geral' | 'atualizar-dados' | 'preferencias';

type ModalState = {
  type: 'none' | 'saveSuccess' | 'deleteConfirm';
  message?: string;
}

function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('geral');
  const [modalState, setModalState] = useState<ModalState>({ type: 'none' });
  const navigate = useNavigate();

  const preferencesForm = usePreferencesForm();

  const handleSavePreferences = () => {
    if (preferencesForm.validate()) {
        console.log("Salvando preferências:", preferencesForm.draftData);
        openSaveModal("Suas preferências foram salvas com sucesso.");
    } else {
        console.log("Formulário de preferências inválido.");
    }
  };

  const openSaveModal = (message: string) => setModalState({ type: 'saveSuccess', message });
  const openDeleteModal = () => setModalState({ type: 'deleteConfirm' });
  const closeModal = () => setModalState({ type: 'none' });
  
  const handleDeleteConfirm = () => {
    console.log("Conta excluída!");
    closeModal();
    navigate('/');
  };
  
  const navItems = [
    { id: 'geral' as Tab, icon: <FaCog className="text-blue size-5"/>, text: 'Geral' },
    { id: 'atualizar-dados' as Tab, icon: <FaUserCheck  className="text-blue size-5"/>, text: 'Atualizar Dados' },
    { id: 'preferencias' as Tab, icon: <FaSlidersH className="text-blue size-5"/>, text: 'Preferências' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'geral':       
        return <GeneralTab 
                  onOpenDeleteModal={openDeleteModal} 
                  onSaveSuccess={openSaveModal} 
               />
      case 'atualizar-dados': 
        return <UpdateDataTab onSaveSuccess={() => openSaveModal("Seus dados foram atualizados com sucesso.")} />
      case 'preferencias': 
        return <PreferencesTab 
                  preferencesData={preferencesForm.draftData}
                  onPreferencesChange={preferencesForm.handleChange}
                  onSave={handleSavePreferences}
                  errors={preferencesForm.errors}
                  onCancel={preferencesForm.handleCancel}
                />
      default: 
        return null;
    }
  }

  return (
    <>
      <PageWithHeaderLayout title="Minha Conta">
         <section className="max-w-5xl mx-auto py-12 px-4 sm:px-8 font-raleway">
  
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-start bg-white rounded-lg shadow overflow-hidden">
                      
            <nav className="flex flex-col ">
              {navItems.map(item => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'secondary' : 'ghost'}
                  className="justify-start h-12 gap-3 w-full rounded-none px-4"
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.icon} {item.text}
                </Button>
              ))}
            </nav>            
       
            <div className="p-6">
              {renderContent()}
            </div>

          </div>
        </section>
      </PageWithHeaderLayout>

      <Modal isOpen={modalState.type === 'saveSuccess'} onClose={closeModal} title="Sucesso!">
        <p>{modalState.message || "Suas alterações foram salvas."}</p>
      </Modal>

      <Modal isOpen={modalState.type === 'deleteConfirm'} onClose={closeModal} title="Excluir Conta" confirmText="Sim, excluir" onConfirm={handleDeleteConfirm} variant="danger">
        <p>Você tem certeza que deseja excluir sua conta? Esta ação é irreversível.</p>
      </Modal>
    </>
  )
}

export default MyAccountPage;