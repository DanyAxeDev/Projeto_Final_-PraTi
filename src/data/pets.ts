import type { Pet } from "@/types/types"

// Dados para teste de desenvolvimento
const testPets: Pet[] = [
  {
    id: 1,
    name: "Tico",
    species: "Cachorro",
    gender: "Macho",
    dob: "2025-06-01",
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
    ],
    isFavorite: false
  }, {
    id: 2,
    name: "Rex",
    species: "Cachorro",
    gender: "Macho",
    dob: "2018-08-12",
    size: "Grande",
    neighbourhood: "Copacabana",
    city: "Rio de Janeiro",
    personality: ["Se dá bem com outros pets", "Se dá bem com crianças", "Brincalhão"],
    health: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget efficitur velit. Nam eget faucibus quam. Orci varius natoque penatibus et magnis dis parturient montes.",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget efficitur velit. Nam eget faucibus quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc interdum risus et ultrices gravida. Pellentesque sollicitudin ipsum id mi consequat, at laoreet dui tincidunt. Vestibulum sagittis commodo dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In nec massa rutrum, laoreet nisi et, sodales felis.",
    photos: [
      "https://placedog.net/360/320",
      "https://placedog.net/360/400",
      "https://placedog.net/360/410",
    ],
    isFavorite: false
  }, {
    id: 3,
    name: "Nina",
    species: "Gato",
    gender: "Fêmea",
    dob: "2023-02-23",
    size: "Pequeno",
    neighbourhood: "Copacabana",
    city: "Rio de Janeiro",
    personality: ["Se dá bem com outros pets", "Se dá bem com crianças", "Brincalhão"],
    health: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget efficitur velit. Nam eget faucibus quam. Orci varius natoque penatibus et magnis dis parturient montes.",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget efficitur velit. Nam eget faucibus quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc interdum risus et ultrices gravida. Pellentesque sollicitudin ipsum id mi consequat, at laoreet dui tincidunt. Vestibulum sagittis commodo dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In nec massa rutrum, laoreet nisi et, sodales felis.",
    photos: [
      "https://placedog.net/360/300",
      "https://placedog.net/360/420",
      "https://placedog.net/360/430",
    ],
    isFavorite: false
  }
]

export default testPets