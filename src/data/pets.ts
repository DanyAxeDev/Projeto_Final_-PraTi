import type { Pet } from "@/types/types"

// Dados para teste de desenvolvimento
const pets: Pet[] = [
  {
    id: 1,
    name: "Tico",
    species: "Cachorro",
    gender: "Macho",
    age: "3 anos",
    size: "Médio",
    neighbourhood: "Copacabana",
    city: "Rio de Janeiro",
    personality: ["Se dá bem com outros pets", "Se dá bem com crianças", "Brincalhão"],
    health: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget efficitur velit. Nam eget faucibus quam. Orci varius natoque penatibus et magnis dis parturient montes.",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget efficitur velit. Nam eget faucibus quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc interdum risus et ultrices gravida. Pellentesque sollicitudin ipsum id mi consequat, at laoreet dui tincidunt. Vestibulum sagittis commodo dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In nec massa rutrum, laoreet nisi et, sodales felis.",
    photos: [
      "https://placedog.net/360/380",
      "https://placedog.net/360/390",
      "https://placedog.net/360/370",
    ]
  }
]

export default pets