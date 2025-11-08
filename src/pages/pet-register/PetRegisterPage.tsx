import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout";
import FormStepHeading from "@/components/FormStepHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoundButton from "@/components/RoundButton";
import Tooltip from "@/components/Tooltip";
import { usePetRegisterForm } from "@/hooks/usePetRegisterForm";
import { toast } from "sonner";
import { findAddress } from "@/services/cepService";
import type { ViaCepResponse } from "@/types/types";
import InputLoader from "@/components/InputLoader";
import MapMarker from "@/components/MapMarker";
import { getGeocode, getLatLng } from "use-places-autocomplete";

type LatLngLiteral = google.maps.LatLngLiteral;

function PetRegisterPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [petCepValue, setPetCepValue] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const {
    formData,
    errors,
    setErrors,
    handleChange,
    setPetLocation,
    validatePetForm,
    registerPet
  } = usePetRegisterForm();
  const selectedLocation = useMemo<LatLngLiteral | null>(() => {
    if (formData.latitude === null || formData.longitude === null) {
      return null;
    }

    return {
      lat: formData.latitude,
      lng: formData.longitude,
    };
  }, [formData.latitude, formData.longitude]);

  const handleLocationChange = useCallback(
    (coords: LatLngLiteral | null) => {
      setPetLocation(coords);

      if (coords) {
        setErrors(prevErrors => {
          const newErrors = { ...prevErrors } as any;
          delete newErrors.latitude;
          delete newErrors.longitude;
          return newErrors;
        });
      }
    },
    [setPetLocation, setErrors]
  );


  const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

  const healthCharCount = formData.health?.length || 0;
  const aboutCharCount = formData.about?.length || 0;
  const minChars = 200;

  const handlePetCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5, 8);
    }
    setPetCepValue(value);

    if ((errors as any).petCep) {
      setErrors((prev: typeof errors) => {
        const newErrors = { ...prev };
        delete (newErrors as any).petCep;
        return newErrors;
      });
    }
  };

  const searchCep = async () => {
    const cep = petCepValue.replace(/\D/g, '');

    if (cep.length === 0) {
      return;
    }

    if (cep.length == 8) {
      try {
        setIsSearching(true)
        const data: ViaCepResponse = await findAddress(cep)

        if ((data as any).erro) {
          toast.error("CEP não encontrado. Por favor, verifique o número.");
          setErrors((prev: typeof errors) => ({ ...prev, petCep: "CEP não encontrado." } as any));
          formData.petAddress = ""
          formData.petNeighborhood = ""
          formData.petCity = ""
          formData.petState = ""
          setPetLocation(null);
        } else {
          setErrors((prev: typeof errors) => {
            const newErrors = { ...prev };
            delete (newErrors as any).petCep;
            return newErrors;
          });
          formData.petAddress = data.logradouro
          formData.petNeighborhood = data.bairro
          formData.petCity = data.localidade
          formData.petState = data.uf

          try {
            const formattedAddress = [
              data.logradouro,
              data.bairro,
              data.localidade,
              data.uf,
              "Brasil"
            ].filter(Boolean).join(", ");

            const hasGoogleMaps = typeof window !== "undefined" && (window as any).google?.maps;
            if (hasGoogleMaps && formattedAddress) {
              const results = await getGeocode({ address: formattedAddress });
              if (results.length > 0) {
                const { lat, lng } = await getLatLng(results[0]);
                setPetLocation({ lat, lng });
              } else {
                setPetLocation(null);
              }
            } else {
              setPetLocation(null);
            }
          } catch (geocodeError) {
            console.error("Erro ao localizar endereço no mapa:", geocodeError);
            setPetLocation(null);
          }
        }

      } catch (e) {
        toast.error("Não foi possível consultar o CEP. Tente novamente.");
        setErrors((prev: typeof errors) => ({ ...prev, petCep: "Falha ao consultar o CEP." } as any));
        console.log("Não foi possível procurar o endereço via CEP.", e)
        setPetLocation(null);
      } finally {
        setIsSearching(false)
      }
    } else if (cep.length > 0 && cep.length < 8) {
      setErrors((prev: typeof errors) => ({ ...prev, petCep: "CEP incompleto. Deve ter 8 dígitos." } as any));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isPetFormValid = validatePetForm();

    let isCepValid = true;
    const cep = petCepValue.replace(/\D/g, '');
    if (cep.length === 0) {
      setErrors((prev: typeof errors) => ({
        ...prev,
        petCep: "CEP é obrigatório."
      } as any));
      isCepValid = false;
    }

    if (isPetFormValid && isCepValid) {
      try {
        const result = await registerPet();
        if (result.success) {
          toast.success("Pet cadastrado com sucesso!");
          navigate("/meus-pets");
        } else {
          toast.error(result.error || "Erro ao cadastrar pet");
        }
      } catch (error) {
        console.error("Erro ao cadastrar pet:", error);
        toast.error("Erro inesperado ao cadastrar pet");
      }
    } else {
      console.log("Erros de validação:", errors);
    }
  };

  return (
    <PageWithHeaderLayout title="Cadastro de Pet">
      <section className="max-w-[1100px] mx-auto flex justify-center items-center h-full pt-15 pb-20 px-4 font-raleway font-medium mt-4 sm:py-20 sm:px-8">
        <form noValidate ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-12 bg-white py-12 px-4 rounded-sm max-w-[695px] w-full sm:px-8">
          {/* Seção 1 */}
          <section>
            <FormStepHeading step={1} title="Dados do pet" />
            <div className="grid grid-cols-2 gap-y-6 gap-x-5">
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="name" className="mb-1 font-semibold">Nome</Label>
                <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} required />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="species" className="mb-1 font-semibold">Espécie</Label>
                <select id="species" name="species" value={formData.species} onChange={handleChange} className="w-full h-9 rounded-md border bg-transparent px-3 py-1 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] md:text-sm">
                  <option value="">Selecione</option>
                  <option value="dog">Cachorro</option>
                  <option value="cat">Gato</option>
                  <option value="other">Outro</option>
                </select>
                {errors.species && <p className="text-red-500 text-xs mt-1">{errors.species}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label className="mb-1 font-semibold">Sexo</Label>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" value="male" onChange={handleChange} checked={formData.gender === 'male'} className="size-4" />
                    Macho
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" value="female" onChange={handleChange} checked={formData.gender === 'female'} className="size-4" />
                    Fêmea
                  </label>
                </div>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 mb-1">
                  <Label htmlFor="dob" className="font-semibold">Data de nascimento</Label>
                  <Tooltip
                    type="help"
                    tip="Se não souber, informe uma data aproximada."
                    label="Ajuda sobre a data de nascimento"
                  />
                </div>
                <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label className="mb-1 font-semibold">Porte</Label>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="size" value="small" onChange={handleChange} checked={formData.size === 'small'} className="size-4" />
                    Pequeno
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="size" value="medium" onChange={handleChange} checked={formData.size === 'medium'} className="size-4" />
                    Médio
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="size" value="large" onChange={handleChange} checked={formData.size === 'large'} className="size-4" />
                    Grande
                  </label>
                </div>
                {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label className="mb-1 font-semibold">Comprovante de castração</Label>
                <Input type="file" id="castration-receipt" name="castrationReceipt" onChange={handleChange} accept="image/*" className="rounded-full max-w-[300px] font-semibold text-brown bg-gray-100" required />
                {errors.castrationReceipt && <p className="text-red-500 text-xs mt-1">{errors.castrationReceipt}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label className="mb-1 font-semibold">Comprovante da última vacinação</Label>
                <Input type="file" id="vaccination-receipt" name="vaccinationReceipt" onChange={handleChange} accept="image/*" className="rounded-full max-w-[300px] font-semibold text-brown bg-gray-100" required />
                {errors.vaccinationReceipt && <p className="text-red-500 text-xs mt-1">{errors.vaccinationReceipt}</p>}
              </div>

              <div className="col-span-2 relative">
                <Label htmlFor="petCep" className="mb-1 font-semibold">CEP</Label>
                <Input
                  id="petCep"
                  name="petCep"
                  placeholder="00000-000"
                  maxLength={9}
                  value={petCepValue}
                  onChange={handlePetCepChange}
                  onBlur={searchCep}
                />
                {(errors as any).petCep && <p className="text-xs text-red-600">{(errors as any).petCep}</p>}
                {isSearching && <InputLoader />}
              </div>

              <div className="col-span-2">
                <Label htmlFor="petAddress" className="mb-1 font-semibold">Endereço</Label>
                <Input id="petAddress" name="petAddress" placeholder="Rua, Avenida, etc." required value={formData.petAddress} onChange={handleChange} />
                {errors.petAddress && <p className="text-xs text-red-600">{errors.petAddress}</p>}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="petNumber" className="mb-1 font-semibold">Número</Label>
                <Input id="petNumber" name="petNumber" placeholder="123 ou S/N" required value={formData.petNumber} onChange={handleChange} />
                {errors.petNumber && <p className="text-xs text-red-600">{errors.petNumber}</p>}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="petNeighborhood" className="mb-1 font-semibold">Bairro</Label>
                <Input id="petNeighborhood" name="petNeighborhood" placeholder="Seu bairro" required value={formData.petNeighborhood} onChange={handleChange} />
                {errors.petNeighborhood && <p className="text-xs text-red-600">{errors.petNeighborhood}</p>}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="petCity" className="mb-1 font-semibold">Cidade</Label>
                <Input id="petCity" name="petCity" placeholder="Sua cidade" required value={formData.petCity} onChange={handleChange} />
                {errors.petCity && <p className="text-xs text-red-600">{errors.petCity}</p>}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="petState" className="mb-1 font-semibold">Estado</Label>
                <select id="petState" name="petState" value={formData.petState} onChange={handleChange} required className="w-full h-9 rounded-md border bg-transparent px-3 py-1 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] md:text-sm">
                  <option value="">Selecione</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
                {errors.petState && <p className="text-xs text-red-600">{errors.petState}</p>}
              </div>

              <div className="col-span-2">
                <MapMarker onLocationChange={handleLocationChange} initialLocation={selectedLocation} />
                {selectedLocation && (
                  <p className="text-xs text-gray-600 mt-2">
                    Local selecionado: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="health" className="mb-1 font-semibold">Descrição sobre a saúde do pet</Label>
                <textarea
                  id="health"
                  name="health"
                  value={formData.health} onChange={handleChange}
                  required
                  rows={8}
                  placeholder="Detalhes sobre o histórico de saúde do pet, se precisa de cuidados, etc..."
                  className="resize-none w-full rounded-md border bg-transparent px-3 py-1 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] md:text-sm"></textarea>
                <div className="flex justify-between items-start w-full mt-1">
                  {errors.health ? (
                    <p className="text-red-500 text-xs">{errors.health}</p>
                  ) : <span></span>}
                  <span className={`text-xs ml-auto ${healthCharCount >= minChars ? "text-green-600 font-semibold" : "text-gray-500"}`}>
                    {healthCharCount}/{minChars}
                  </span>
                </div>
              </div>

              <div className="col-span-2">
                <Label htmlFor="about" className="mb-1 font-semibold">História do pet</Label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about} onChange={handleChange}
                  required
                  rows={8}
                  placeholder="Detalhes sobre a história do pet, características dele, etc..."
                  className="resize-none w-full rounded-md border bg-transparent px-3 py-1 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] md:text-sm"></textarea>
                <div className="flex justify-between items-start w-full mt-1">
                  {errors.about ? (
                    <p className="text-red-500 text-xs">{errors.about}</p>
                  ) : <span></span>}
                  <span className={`text-xs ml-auto ${aboutCharCount >= minChars ? "text-green-600 font-semibold" : "text-gray-500"}`}>
                    {aboutCharCount}/{minChars}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Seção 2 */}
          <section>
            <FormStepHeading step={2} title="Personalidade" />
            <p className="mb-2">Marque as opções que melhor descrevem o pet.</p>
            <div className="columns-1 sm:columns-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-active" onChange={handleChange} checked={!!formData.personality.active} className="size-4 text-primary rounded" />
                Ativo
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-goodWithPets" onChange={handleChange} checked={!!formData.personality.goodWithPets} className="size-4 text-primary rounded" />
                Se dá bem com outros pets
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-calm" onChange={handleChange} checked={!!formData.personality.calm} className="size-4 text-primary rounded" />
                Calmo
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-goodWithKids" onChange={handleChange} checked={!!formData.personality.goodWithKids} className="size-4 text-primary rounded" />
                Se dá bem com crianças
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-extrovert" onChange={handleChange} checked={!!formData.personality.extrovert} className="size-4 text-primary rounded" />
                Extrovertido
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-introvert" onChange={handleChange} checked={!!formData.personality.introvert} className="size-4 text-primary rounded" />
                Introvertido
              </label>
            </div>
            {errors.personality && <p className="text-red-500 text-xs mt-1">{errors.personality}</p>}
          </section>

          {/* Seção 3 */}
          <section>
            <FormStepHeading step={3} title="Fotos" />
            <p className="mb-2">Selecione até 3 fotos.</p>
            {errors.photo1 && <p className="text-red-500 text-xs mb-2">{errors.photo1}</p>}
            <div className="flex flex-col gap-3 max-w-[300px]">
              <Input type="file" id="photo1" name="photo1" onChange={handleChange} accept="image/*" className="rounded-full font-semibold text-brown bg-gray-100" />
              <Input type="file" id="photo2" name="photo2" onChange={handleChange} accept="image/*" className="rounded-full font-semibold text-brown bg-gray-100" />
              <Input type="file" id="photo3" name="photo3" onChange={handleChange} accept="image/*" className="rounded-full font-semibold text-brown bg-gray-100" />
            </div>
          </section>

          {/* Seção 4 */}
          <section className="mb-2">
            <FormStepHeading step={4} title="Contato" />
            <p className="mb-2">Receber contatos de interessados via:</p>
            <div>
              <label className="flex items-center gap-2">
                <input type="radio" name="contactOption" value="whatsapp" onChange={handleChange} checked={formData.contactOption === 'whatsapp'} className="size-4" />
                WhatsApp
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="contactOption" value="email" onChange={handleChange} checked={formData.contactOption === 'email'} className="size-4" />
                E-mail
              </label>
            </div>
            {errors.contactOption && <p className="text-red-500 text-xs mt-1">{errors.contactOption}</p>}
          </section>

          <RoundButton color="blue" text="Cadastrar pet" onClick={() => formRef.current?.requestSubmit()} />
        </form>
      </section>
    </PageWithHeaderLayout>
  )
}

export default PetRegisterPage