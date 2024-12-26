export interface MenuItem {
  name: string;
  price: number;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface MenuData {
  sections: MenuSection[];
}
