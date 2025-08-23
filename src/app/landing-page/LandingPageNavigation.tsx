import { Navbar, NavbarSection, NavbarItem } from "@/app/templates/navbar";

export default function LandingPageNavigation() {
  return (
    <Navbar>
      <NavbarSection>
        <NavbarItem href="/" current>
          <h1 className="text-4xl font-bold gradient-text">Coach OS</h1>
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}
