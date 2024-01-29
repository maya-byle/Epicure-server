import claro from "../Assets/png/restaurants/claro.png";
import kabkem from "../Assets/png/restaurants/Kab-kem.png";
import messa from "../Assets/png/restaurants/Messa.png";
import nithanthai from "../Assets/png/restaurants/nithan-thai.png";
import tigerlily from "../Assets/png/restaurants/tiger-lily.png";
import yapan from "../Assets/png/restaurants/Yapan.png";

import oneStar from "../Assets/svg/3stars.svg";
import twoStars from "../Assets/svg/3stars.svg";
import threeStars from "../Assets/svg/3stars.svg";
import fourStars from "../Assets/svg/4stars.svg";

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
  title: "popular restaurant in epicure:",
  cards: [
    {
      title: "Claro",
      subTitle: "Ran Shmueli",
      img: claro,
      stars: fourStars,
    },
    {
      title: "Kab Kem",
      subTitle: "Yariv Malili",
      img: kabkem,
      stars: threeStars,
    },
    {
      title: "Messa",
      subTitle: "Aviv Moshe",
      img: messa,
      stars: fourStars,
    },
    {
      title: "Nitan Thai",
      subTitle: "Shahaf Shabtay",
      img: nithanthai,
      stars: oneStar,
    },
    {
      title: "Tiger Lilly",
      subTitle: "Yanir Green",
      img: tigerlily,
      stars: fourStars,
    },
    {
      title: "Ya Pan",
      subTitle: "Yuval Ben Moshe",
      img: yapan,
      stars: twoStars,
    },
  ],
};

export default container;
