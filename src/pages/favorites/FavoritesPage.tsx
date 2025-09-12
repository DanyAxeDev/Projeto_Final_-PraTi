import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout"
import PetCard from "@/components/PetCard"
import FavoriteButton from "@/components/FavoriteButton"
import testPets from "@/data/pets"

function FavoritesPage() {
  return (
    <PageWithHeaderLayout title="Favoritos">
      <section className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-[1100px] mx-auto h-full pt-15 pb-20 px-4 font-raleway font-medium mt-4 sm:py-20 sm:px-8">
        {testPets.map(pet => {
          return (
            <div className="w-fit relative" key={`pet-${pet.id}`}>
              <PetCard 
              key={pet.id} 
              id={pet.id}
              name={pet.name}
              dob={pet.dob}
              gender={pet.gender}
              city={pet.city}
              photo={pet.photos[0]}
              />

              <div className="w-fit absolute right-0 bottom-[-12px]">
                <FavoriteButton key={`button-${pet.id}`} isFavorite={true} />
              </div>
            </div>
          )
        })}
      </section>
    </PageWithHeaderLayout>
  )
}

export default FavoritesPage
