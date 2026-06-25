import type { ProductCardData } from "@/components/ProductCard";

export const products: ProductCardData[] = [
  {
    id: "1",
    title: "Sports Series Car Seat Cover - Smoked Black",
    description:
      "Premium lacoste fabric with leather trim, 3-layer breathable, racing-style design for all vehicles.",
    image: "/images/product-carseat1.jpg",
    badge: "Best Seller",
    badgeColor: "red",
    category: "Seat Covers",
  },
  {
    id: "2",
    title: "Luxury Leather Seat Cover Set - Madrid Beige",
    description:
      "Custom-fit Madrid design premium leather, compatible with Mercedes X-Class 2017-2023.",
    image: "/images/product-carseat2.jpg",
    badge: "Premium",
    badgeColor: "blue",
    category: "Seat Covers",
  },
  {
    id: "3",
    title: "Carbon Fiber Steering Wheel Cover - Blue Stitch",
    description:
      "Carbon digital print with blue leather, superior grip, fits 38-40cm wheels.",
    image: "/images/product-carseat3.jpg",
    badge: "Popular",
    badgeColor: "green",
    category: "Steering Covers",
  },
  {
    id: "4",
    title: "Dubai Series Seat Cover Set - Ruby Red",
    description:
      "Luxury Dubai design with velvet and leather, TUV certified, airbag compatible, full set.",
    image: "/images/product-carseat4.jpg",
    badge: "Premium",
    badgeColor: "blue",
    category: "Seat Covers",
  },
  {
    id: "5",
    title: "Heated Car Seat Cover - Winter Cotton Black",
    description:
      "Soft cotton heated cover with smart chip, 12V/24V, overheat protection, fast heating.",
    image: "/images/product-carseat5.jpg",
    badge: "Winter Ready",
    badgeColor: "blue",
    category: "Seat Covers",
  },
  {
    id: "6",
    title: "Florida Series Seat Cover - Cool Beige",
    description:
      "Keeps cool in summer, anti-bacterial pique fabric, breathable 3-layer design.",
    image: "/images/product-carseat6.jpg",
    badge: "New",
    badgeColor: "green",
    category: "Seat Covers",
  },
  {
    id: "7",
    title: "Custom Fit Floor Mats - Mercedes C Class",
    description:
      "Premium PU leather, waterproof non-slip base, personalized edge piping available.",
    image: "/images/product-carseat7.jpg",
    badge: "Best Seller",
    badgeColor: "red",
    category: "Floor Mats",
  },
  {
    id: "8",
    title: "Memory Foam Cushion Set - 3 Pieces",
    description:
      "Orthopedic back support with memory foam, ergonomic design, relieves driving fatigue.",
    image: "/images/product-carseat8.jpg",
    badge: "Comfort",
    badgeColor: "green",
    category: "Accessories",
  },
  {
    id: "9",
    title: "Luxury Leather Steering Wheel Cover - Black",
    description:
      "Premium faux leather, heat & cold resistant, anti-slip design, easy 5-min install.",
    image: "/images/product-carseat9.jpg",
    badge: "Popular",
    badgeColor: "green",
    category: "Steering Covers",
  },
  {
    id: "10",
    title: "All-Weather Rubber Car Mats - Heavy Duty",
    description:
      "Custom-fit heavy-duty rubber, easy to clean, raised edges for spill containment.",
    image: "/images/product-carseat10.jpg",
    category: "Floor Mats",
  },
  {
    id: "11",
    title: "Carbon Black Sports Seat Cover Set",
    description:
      "Carbon pattern with breathable mesh, racing style, 5-seat full set with headrests.",
    image: "/images/product-carseat11.jpg",
    badge: "-15%",
    badgeColor: "red",
    category: "Seat Covers",
  },
  {
    id: "12",
    title: "Velvet Premium Seat Cover - Bordeaux Red",
    description:
      "Luxurious velvet fabric, wine red color, full set with headrests, elegant finish.",
    image: "/images/product-carseat12.jpg",
    badge: "Premium",
    badgeColor: "blue",
    category: "Seat Covers",
  },
];

export const productCategories = [
  "All",
  "Seat Covers",
  "Steering Covers",
  "Floor Mats",
  "Accessories",
];

export const featuredProducts = products.slice(0, 8);
