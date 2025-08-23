import { Navbar, NavbarSection, NavbarItem } from "@/app/templates/navbar";

export default function LandingPageNavigation() {
  return (
    <Navbar>
      <NavbarSection>
        <NavbarItem href="/" current>
          <div className="text-2xl font-bold bg-gradient-to-r from-white to-muted-foreground bg-clip-text text-transparent">
            Coach OS
          </div>
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}
