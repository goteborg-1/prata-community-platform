interface MenuItem {
  title: string,
  path: string
}

export const mainMenu: MenuItem[] = [
  {title: "Hem", path: "/"},
  {title: "Flöde", path: "/flode"},
  {title: "Kategorier", path: "/kategorier"}
]

export const secondaryMenu: MenuItem[] = [
  {title: "Konto", path: "/profil"},
  {title: "Om PrataUt", path: "/om-oss"}
]