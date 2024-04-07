import { atom } from "recoil";

export const salesData = atom({
  key: "salesData",
  default: [],
});
export const DarkMode = atom({
  key: "DarkMode",
  default: true,
});
export const Products = atom({
  key: "Products",
  default: [],
});
export const Colors = atom({
  key: "Colors",
  default: [],
});
export const Revenue = atom({
  key: "Revenue",
  default: 0,
});
export const Total = atom({
  key: "Total",
  default: 0,
});
export const RecentOrderList = atom({
  key: "RecentOrderList",
  default: [],
});
export const Traffic = atom({
  key: "Traffic",
  default: [{ location: "USA", percentage: 35.56500177116543 }],
});
export const showNav = atom({
  key: "showNav",
  default: false,
});