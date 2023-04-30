import { useState } from "react";
import useMedia from "use-media";
import { userData } from "@/utils/userData";

import {
  Navbar as NavbarWrapper,
  LogoTipo,
  LogoTipoText,
  NavbarLinks,
  NavbarMobileArea,
} from "./style";

import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Button } from "@/styles/Buttons";
import { Container, Flex } from "@/styles/Global";
import logo from "../../public/static/img/logo/logo-emer.png"

export interface MenuButtonOpen {
  open: Boolean;
  setOpen: (value: Boolean) => void;
}

export const NavBar = (): JSX.Element => {

  const isWide = useMedia({ maxWidth: "991px" });

  document.title = userData.nameUser;

  const [open, setOpen] = useState(false);

  const OpenMenu = () => {
    setOpen(!open);
  };

  return (
    <NavbarWrapper>
      <Container>
        <NavbarMobileArea>
          <LogoTipo>
            <LogoTipoText><img src={logo} /></LogoTipoText>
          </LogoTipo>
          {isWide && (
            <Button
              type="icon"
              onClick={OpenMenu}
              aria-label={!open ? "Abrir Menu" : "Fechar Menu"}
            >
              {!open ? <FaBars /> : <IoClose />}
            </Button>
          )}
        </NavbarMobileArea>
        <Flex>
          {isWide ? open && <NavLinks /> : <NavLinks />}
        </Flex>
      </Container>
    </NavbarWrapper>
  );
};

export const NavLinks = (): JSX.Element => {
  return (
    <NavbarLinks>
      <Button type="btLink" as="a" color="grey4" href={`#home`}
        css={{
          "&:hover": {
            color: "$color5",
          }
        }}>
        Home
      </Button>
      <Button type="btLink" as="a" color="grey4" href={`#projects`} css={{
        "&:hover": {
          color: "$color5",
        }
      }}>
        Projetos
      </Button>
      <Button type="btLink" as="a" color="grey4" href={`#contact`} css={{
        "&:hover": {
          color: "$color5",
        }
      }}>
        Contato
      </Button>
      <Button type="btLink" as="a" color="grey4" href={`#social-media`} css={{
        "&:hover": {
          color: "$color5",
        }
      }}>
        Mídias Sociais
      </Button>
    </NavbarLinks>
  );
};
