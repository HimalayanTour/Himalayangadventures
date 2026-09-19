export const tours = [
  {
    slug: "lhasa-classic",
    name: "Lhasa Classic Journey",
    region: "Tibet",
    duration: "5 days",
    price: "$1,290",
    difficulty: "Easy–Moderate",
    lat: 29.652,
    lng: 91.172,
  },

  {
    slug: "lhasa-everest-base-camp",
    name: "Lhasa to Everest Base Camp",
    region: "Tibet",
    duration: "8 days",
    price: "$1,890",
    difficulty: "Moderate",
    lat: 28.193,
    lng: 86.829,
  },

  {
    slug: "lhoka-southern-tibet",
    name: "Lhoka (Southern Tibet)",
    region: "Tibet",
    duration: "7 days",
    price: "$1,590",
    difficulty: "Easy–Moderate",
    lat: 29.238,
    lng: 91.772,
  },

  {
    slug: "tibet-high-plateau",
    name: "Tibet High Plateau",
    region: "Tibet",
    duration: "12 days",
    price: "$2,190",
    difficulty: "Moderate",
    lat: 29.65,
    lng: 91.1,
  },

  {
    slug: "kailash-mansarovar-journey",
    name: "Kailash & Mansarovar Journey",
    region: "Tibet",
    duration: "15 days",
    price: "$2,890",
    difficulty: "Moderate",
    lat: 31.0675,
    lng: 81.3119,
  },

  {
    slug: "kailash-kora",
    name: "Mount Kailash Kora",
    region: "Tibet",
    duration: "13 days",
    price: "$2,690",
    difficulty: "Challenging",
    lat: 31.0675,
    lng: 81.3119,
  },

  {
    slug: "namtso-lake",
    name: "Lhasa & Namtso Lake",
    region: "Tibet",
    duration: "7 days",
    price: "$1,690",
    difficulty: "Moderate",
    lat: 30.718,
    lng: 90.643,
  },

  {
    slug: "tibet-photography",
    name: "Tibet Photography Journey",
    region: "Tibet",
    duration: "10 days",
    price: "$2,390",
    difficulty: "Moderate",
    lat: 29.652,
    lng: 91.172,
  },

  {
    slug: "tibet-culture-monasteries",
    name: "Tibet Culture & Monasteries",
    region: "Tibet",
    duration: "9 days",
    price: "$1,990",
    difficulty: "Easy–Moderate",
    lat: 29.652,
    lng: 91.172,
  },
] as const;

export type Tour = (typeof tours)[number];

export function getTour(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}
