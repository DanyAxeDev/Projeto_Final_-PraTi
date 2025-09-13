import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout"
import FormStepHeading from "@/components/FormStepHeading"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RoundButton from "@/components/RoundButton"
import Tooltip from "../../components/Tooltip"

function PetRegisterPage() {
  return (
    <PageWithHeaderLayout title="Cadastro de Pet">
      <section className="max-w-[1100px] mx-auto flex justify-center items-center h-full pt-15 pb-20 px-4 font-raleway font-medium mt-4 sm:py-20 sm:px-8">
        <form className="flex flex-col gap-12 bg-white py-12 px-4 rounded-sm max-w-[695px] w-full sm:px-8">
          {/* Seção 1 */}
          <section>
            <FormStepHeading step={1} title="Dados do pet" />
            <div className="grid grid-cols-2 gap-y-6 gap-x-5">
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="name" className="mb-1 font-semibold">Nome</Label>
                <Input id="name" required />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="species" className="mb-1 font-semibold">Espécie</Label>
                <select id="species" className="w-full h-9 rounded-md border bg-transparent px-3 py-1 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] md:text-sm">
                  <option value="dog">Cachorro</option>
                  <option value="cat">Gato</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label className="mb-1 font-semibold">Sexo</Label>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" value="male" className="size-4" />
                    Macho
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" value="female" className="size-4" />
                    Fêmea
                  </label>
                </div>
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
                <Input id="dob" type="date" required />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label className="mb-1 font-semibold">Porte</Label>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="size" value="small" className="size-4" />
                    Pequeno
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="size" value="medium" className="size-4" />
                    Médio
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="size" value="big" className="size-4" />
                    Grande
                  </label>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label className="mb-1 font-semibold">Comprovante de castração</Label>
                <Input type="file" id="castration-receipt" className="rounded-full max-w-[300px] font-semibold text-brown bg-gray-100" required />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label className="mb-1 font-semibold">Comprovante da última vacinação</Label>
                <Input type="file" id="vaccination-receipt" className="rounded-full max-w-[300px] font-semibold text-brown bg-gray-100" required />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="address" className="mb-1 font-semibold">Localização</Label>
                <Input type="address" placeholder="Rua, Cidade, Estado" required />
              </div>

              <div className="col-span-2">
                <Label htmlFor="health" className="mb-1 font-semibold">Descrição sobre a saúde do pet</Label>
                <textarea 
                id="health" 
                required 
                rows={8} 
                placeholder="Detalhes sobre o histórico de saúde do pet, se precisa de cuidados, etc..."
                className="resize-none w-full rounded-md border bg-transparent px-3 py-1 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] md:text-sm"></textarea>
              </div>

              <div className="col-span-2">
                <Label htmlFor="about" className="mb-1 font-semibold">História do pet</Label>
                <textarea 
                id="about" 
                required 
                rows={8} 
                placeholder="Detalhes sobre a história do pet, características dele, etc..."
                className="resize-none w-full rounded-md border bg-transparent px-3 py-1 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] md:text-sm"></textarea>
              </div>
            </div>
          </section>
          
          {/* Seção 2 */}
          <section>
            <FormStepHeading step={2} title="Personalidade" />
            <p className="mb-2">Marque as opções que melhor descrevem o pet.</p>
            <div className="columns-1 sm:columns-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-active" className="size-4 text-primary rounded"  />
                Ativo
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-goodWithPets" className="size-4 text-primary rounded" />
                Se dá bem com outros pets
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-calm" className="size-4 text-primary rounded" />
                Calmo
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-goodWithKids" className="size-4 text-primary rounded" />
                Se dá bem com crianças
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-extrovert" className="size-4 text-primary rounded" />
                Extrovertido
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="personality-introvert" className="size-4 text-primary rounded" />
                Introvertido
              </label>
            </div>
          </section>

          {/* Seção 3 */}
          <section>
            <FormStepHeading step={3} title="Fotos" />
            <p className="mb-2">Selecione até 3 fotos.</p>
            <div className="flex flex-col gap-3 max-w-[300px]">
              <Input type="file" id="photo1" className="rounded-full font-semibold text-brown bg-gray-100" required />
              <Input type="file" id="photo2" className="rounded-full font-semibold text-brown bg-gray-100" />
              <Input type="file" id="photo3" className="rounded-full font-semibold text-brown bg-gray-100" />
            </div>
          </section>

          {/* Seção 4 */}
          <section className="mb-2">
            <FormStepHeading step={4} title="Contato" />
            <p className="mb-2">Receber contatos de interessados via:</p>
            <div>
              <label className="flex items-center gap-2">
                  <input type="radio" name="contact-option" value="whatsapp" className="size-4" />
                  WhatsApp
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="contact-option" value="email" className="size-4" />
                  E-mail
                </label>
            </div>
          </section>

          <RoundButton color="blue" text="Cadastrar pet" onClick={() => ""} />
        </form>
      </section>
    </PageWithHeaderLayout>
  )
}

export default PetRegisterPage
