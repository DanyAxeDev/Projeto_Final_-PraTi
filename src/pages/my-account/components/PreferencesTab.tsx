import RoundButton from "@/components/RoundButton";

export type PreferencesData = {
    notifications: { [key: string]: boolean };
    privacy: { [key: string]: boolean };
    adoption: {
        animalTypes: { [key: string]: boolean };
        sexo: string;
        porte: string;
        idade: string;
    };
};

type TabProps = {
    preferencesData: PreferencesData;
    onPreferencesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    errors: {
      adoption: {
        animalTypes: string;
        sexo: string;
        porte: string;
        idade: string;
      }
    }
}

const ToggleSwitch = ({ checked, onChange, name }: { checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, name: string }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={onChange} name={name} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue"></div>
    </label>
);

const RadioGroup = ({ title, name, options, selectedValue, onChange }: { title: string, name: string, options: string[], selectedValue: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="mt-4">
        <p className="font-medium text-gray-700">{title}:</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
            {options.map(option => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={name} value={option} checked={selectedValue === option} onChange={onChange} className="h-4 w-4 text-blue focus:ring-blue" />
                    {option}
                </label>
            ))}
        </div>
    </div>
);

const CheckboxGroup = ({ title, name, options, checkedValues, onChange }: { title: string, name: string, options: string[], checkedValues: { [key: string]: boolean }, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="mt-4">
        <p className="font-medium text-gray-700">{title}:</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
            {options.map(option => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name={name} value={option} checked={!!checkedValues[option]} onChange={onChange} className="h-4 w-4 text-blue focus:ring-blue rounded-sm" />
                    {option}
                </label>
            ))}
        </div>
    </div>
);

const notificationLabels: { [key: string]: string } = {
    email: "Receber notificações por e-mail:",
    newAnimals: "Receber alertas de animais novos:",
    appointments: "Lembrete de visitas agendadas:",
    whatsapp: "Receber notificações por whatsapp:",
};

const privacyLabels: { [key: string]: string } = {
    showFullName: "Mostrar meu nome completo:",
    showLocation: "Exibir cidade e estado no perfil:",
    allowDirectMessages: "Permitir que protetores enviem mensagens diretas:",
};

function PreferencesTab({ preferencesData, onPreferencesChange, onSave, errors }: TabProps) {

    return (
        <div className="font-raleway text-gray-800">
            <section data-section="notifications">
                <h3 className="text-lg font-bold border-b pb-2">Preferências de Notificação</h3>
                <div className="flex flex-col gap-3 mt-4">
                    {Object.entries(notificationLabels).map(([key, label]) => (
                         <div key={key} className="flex justify-between items-center">
                            <p>{label}</p> 
                            <ToggleSwitch name={key} checked={preferencesData.notifications[key]} onChange={onPreferencesChange} />
                         </div>
                    ))}
                </div>
            </section>

            <section className="mt-8" data-section="privacy">
                <h3 className="text-lg font-bold border-b pb-2">Preferências de Privacidade</h3>
                <div className="flex flex-col gap-3 mt-4">
                     {Object.entries(privacyLabels).map(([key, label]) => (
                         <div key={key} className="flex justify-between items-center">
                            <p>{label}</p> 
                            <ToggleSwitch name={key} checked={preferencesData.privacy[key]} onChange={onPreferencesChange} />
                         </div>
                    ))}
                </div>
            </section>

            <section className="mt-8" data-section="adoption">
                <h3 className="text-lg font-bold border-b pb-2">Preferências de Adoção</h3>
                
                <CheckboxGroup 
                    title="Tipos de Animais de interesse" 
                    name="animalTypes" 
                    options={["Cachorro", "Gato", "Outros animais"]} 
                    checkedValues={preferencesData.adoption.animalTypes} 
                    onChange={onPreferencesChange} 
                />
                {errors.adoption.animalTypes && <p className="text-xs text-destructive mt-1">{errors.adoption.animalTypes}</p>}

                <RadioGroup 
                    title="Sexo" 
                    name="sexo" 
                    options={["Macho", "Fêmea"]} 
                    selectedValue={preferencesData.adoption.sexo} 
                    onChange={onPreferencesChange} 
                />
                {errors.adoption.sexo && <p className="text-xs text-destructive mt-1">{errors.adoption.sexo}</p>}

                <RadioGroup 
                    title="Porte do Animal" 
                    name="porte" 
                    options={["Pequeno", "Médio", "Grande"]} 
                    selectedValue={preferencesData.adoption.porte} 
                    onChange={onPreferencesChange} 
                />
                {errors.adoption.porte && <p className="text-xs text-destructive mt-1">{errors.adoption.porte}</p>}

                <RadioGroup 
                    title="Idade do animal" 
                    name="idade" 
                    options={["Filhote", "Adulto", "Idoso"]} 
                    selectedValue={preferencesData.adoption.idade} 
                    onChange={onPreferencesChange} 
                />
                {errors.adoption.idade && <p className="text-xs text-destructive mt-1">{errors.adoption.idade}</p>}

            </section>

            <div className="mt-10 flex justify-end">
                <RoundButton text="Salvar Alterações" color="blue" onClick={onSave} />
            </div>
        </div>
    )
}

export default PreferencesTab;