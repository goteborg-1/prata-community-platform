interface MenuItem {
  title: string,
  path: string
}

export const mainMenu: MenuItem[] = [
  {title: "Hem", path: "/"},
  {title: "Flöde", path: "/flode"},
  {title: "Om PrataUt", path: "/om-oss"},
]

export const loggedInMenu: MenuItem[] = [
  {title: "Konto", path: "/profil"},
  {title: "Inställningar", path: "/installningar"},
]

export const adminMenu: MenuItem[] = [
  {title: "Administration", path: "/admin"}
]