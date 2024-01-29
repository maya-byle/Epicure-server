import onza from "../Assets/png/restaurants/onza.png";
import kitchenmarket from "../Assets/png/restaurants/kitchenmarket.png";
import mashya from "../Assets/png/restaurants/mashya.png";

export interface CardType {
  img: string;
  title: string;
  subTitle?: string;
  stars?: string;
  foodIcon?: string;
  price?: number;
  isBig?: string;
}

const container: { title: string; cards: CardType[] } = {
  title: "Yossi’s Restaurants",
  cards: [
    {
      title: "Onza",
      img: onza,
    },
    {
      title: "Kitchen Market",
      img: kitchenmarket,
    },
    {
      title: "Mashya",
      img: mashya,
    },
  ],
};

export default container;
