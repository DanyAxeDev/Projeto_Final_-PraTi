import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { FaCog, FaUserCheck, FaSlidersH } from 'react-icons/fa';
import GeneralTab from "./components/GeneralTab";
import UpdateDataTab from "./components/UpdateDataTab";
import PreferencesTab from "./components/PreferencesTab";
import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout";
import { usePreferencesForm } from "@/hooks/usePreferencesForm";
import Modal from "@/components/Modal";
import RoundButtonDanger from "@/components/RoundButtonDanger";
import { IoIosAlert } from "react-icons/io";
import { toast } from "sonner";

type Tab = 'geral' | 'atualizar-dados' | 'preferencias';

type ModalState = {
  type: 'none' | 'deleteConfirm';
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
        toast.success("Suas preferências foram salvas com sucesso.");
    } else {
        console.log("Formulário de preferências inválido.");
    }
  };

  const openDeleteModal = () => setModalState({ type: 'deleteConfirm' });
  const closeModal = () => setModalState({ type: 'none' });
  
  const handleDeleteConfirm = () => {
    console.log("Conta excluída!");
    closeModal();
    toast.success("Conta excluída!");
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
                  onSaveSuccess={() => toast.success("Senha alterada com sucesso!")} 
               />
      case 'atualizar-dados': 
        return <UpdateDataTab onSaveSuccess={() => toast.success("Seus dados foram atualizados com sucesso.")} />
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
         <section className="max-w-5xl mx-auto py-12 px-4 sm:px-8 font-raleway font-medium">
  
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-start bg-white rounded-lg shadow overflow-hidden">
                      
            <nav className="flex flex-col py-6">
              {navItems.map(item => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'secondary' : 'ghost'}
                  className="justify-start h-12 gap-3 w-full rounded-none px-4 cursor-pointer"
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
      
      {/* Modal de excluir conta */}
      <Modal isModalOpen={modalState.type === 'deleteConfirm'} closeModal={closeModal} title="Excluir conta">
        <IoIosAlert aria-hidden="true" className="text-5xl text-red-400" />
        <p>Você tem certeza que deseja excluir sua conta? Esta ação é irreversível.</p>
        <div className="flex gap-3 mt-4 sm:gap-4">
          <button onClick={closeModal} className="font-raleway font-bold hover:text-darkbrown py-1 px-4 cursor-pointer transition-colors duration-300">Cancelar</button>
          <RoundButtonDanger text="Sim, excluir" onClick={handleDeleteConfirm} />
        </div>
      </Modal>
    </>
  )
}

export default MyAccountPage;