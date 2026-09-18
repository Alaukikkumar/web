export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "systems", label: "Systems" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const footerLinks: NavItem[] = navItems.filter((item) => item.id !== "systems");
