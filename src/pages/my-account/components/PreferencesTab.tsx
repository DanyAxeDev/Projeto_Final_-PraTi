import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import RoundButton from "@/components/RoundButton";

export type PreferencesData = {
    adoption: {
        animalType: string; 
        gender: string;
        size: string;
        age: string;
        personality: { [key: string]: boolean };
        distance: number;
    };
};

type TabProps = {
    preferencesData: PreferencesData;
    onPreferencesChange: (change: { target: { name: string; value: any } }) => void;
    onSave: () => void;
    onCancel: () => void;
    errors?: { 
      adoption?: { 
        animalType?: string; 
        gender?: string;
        size?: string;
        age?: string;
        personality?: string; 
      };
    }
}

const RadioButtons = ({ name, options, selectedValue, onChange }: { name: string, options: string[], selectedValue: string, onChange: any }) => (
    <RadioGroup value={selectedValue} onValueChange={(value) => onChange({ target: { name, value } })} className="flex flex-col items-start gap-y-2 mt-2">
        {options.map(option => (
             <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${name}-${option}`} />
                <Label htmlFor={`${name}-${option}`} className="font-normal">{option}</Label>
            </div>
        ))}
    </RadioGroup>
);

function PreferencesTab({ preferencesData, onPreferencesChange, onSave, onCancel, errors }: TabProps) {
    const { adoption } = preferencesData;

    const handleCheckboxChange = (checked: boolean, value: string) => {
        onPreferencesChange({
            target: {
                name: 'personality',
                value: { ...adoption.personality, [value]: checked }
            }
        });
    };

    const personalityOptions = [
        ['Ativo', 'Calmo', 'Extrovertido', 'Introvertido'],
        ['Se dá bem com outros pets', 'Se dá bem com crianças']
    ];

    return (
        <div className="font-raleway text-gray-800 space-y-8">
            <h2 className="text-xl font-bold">Preferências</h2>
            
            <section data-section="adoption">
                <h3 className="text-lg font-semibold pb-2">Preferências de pets</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4"> 
                    <div>
                        <Label className="font-medium">Eu desejo ver...</Label>                     
                        <RadioButtons name="animalType" options={["Cão", "Gato", "Não tenho preferência"]} selectedValue={adoption.animalType} onChange={onPreferencesChange} />
                        {errors?.adoption?.animalType && <p className="text-xs text-destructive mt-1">{errors.adoption.animalType}</p>}
                    </div>

                    <div>
                        <Label className="font-medium">Prefiro um pet...</Label>
                        <RadioButtons name="gender" options={["Macho", "Fêmea", "Não tenho preferência"]} selectedValue={adoption.gender} onChange={onPreferencesChange} />
                        {errors?.adoption?.gender && <p className="text-xs text-destructive mt-1">{errors.adoption.gender}</p>}
                    </div>

                    <div>
                        <Label className="font-medium">Com idade...</Label>
                        <RadioButtons name="age" options={["Filhote", "Jovem", "Adulto", "Idoso", "Não tenho preferência"]} selectedValue={adoption.age} onChange={onPreferencesChange} />
                        {errors?.adoption?.age && <p className="text-xs text-destructive mt-1">{errors.adoption.age}</p>}
                    </div>

                    <div>
                        <Label className="font-medium">De porte...</Label>
                        <RadioButtons name="size" options={["Pequeno", "Médio", "Grande", "Não tenho preferência"]} selectedValue={adoption.size} onChange={onPreferencesChange} />
                        {errors?.adoption?.size && <p className="text-xs text-destructive mt-1">{errors.adoption.size}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <Label className="font-medium">Personalidade que procuro em um pet</Label>
                        <div className="grid md:grid-cols-2 gap-x-8 mt-2">
                            {personalityOptions.map((column, colIndex) => (
                                <div key={colIndex} className="flex flex-col gap-y-2">
                                    {column.map(p => (
                                        <div key={p} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={p} 
                                                checked={!!adoption.personality[p]} 
                                                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, p)} 
                                            />
                                            <Label htmlFor={p} className="font-normal ">{p}</Label>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {errors?.adoption?.personality && <p className="text-xs text-destructive mt-1">{errors.adoption.personality}</p>}
                    </div>
                </div>
                
                <div className="mt-6">
                    <Label className="font-medium">Distância máxima</Label>
                    <div className="flex items-center gap-4 mt-2">
                        <Slider 
                           id="distance" 
                           name="distance"
                           min={1} 
                           max={100} 
                           step={1} 
                           value={[adoption.distance]} 
                           onValueChange={(value) => onPreferencesChange({ target: { name: 'distance', value: value[0] } })}
                        />
                        <span className="font-semibold text-gray-700 w-12 text-center">{adoption.distance} km</span>
                    </div>
                </div>
            </section>

            <div className="flex justify-end gap-3 border-t pt-6 mt-4">
                <RoundButton text="Cancelar" color="gray"  onClick={onCancel} />
                <RoundButton text="Salvar" color="blue" onClick={onSave} />
            </div>
        </div>
    );
}

export default PreferencesTab;