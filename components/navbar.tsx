import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
// import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import clsx from "clsx";
// import { useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  // TwitterIcon,
  GithubIcon,
  // DiscordIcon,
  // HeartFilledIcon,
  SearchIcon,
  // Logo,
  PythonLogo,
} from "@/components/icons";

export const Navbar = ({
  cardItems,
}: {
  cardItems: { id: string; title: string }[];
}) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const theme = useTheme().theme || "light";

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl">
      <NavbarContent
        className="basis-1/5 sm:basis-full flex-col  items-start pt-2"
        justify="start"
      >
        <NavbarBrand className="gap-3 max-w-fit  justify-center">
          <NextLink className="flex justify-center items-center gap-1" href="/">
            <PythonLogo />
            <p className="font-bold text-inherit">Python Cards</p>
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-center ml-2 flex-wrap border  text-[#FFD445] bold text-center bg-[#3771A3] p-4 rounded-md absolute top-16 left-0 right-0">
          {cardItems.map((item) => (
            <NavbarItem key={item.id}>
              <NextLink className=" hover:text-white" href={`#${item.id}`}>
                {item.title}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <Link isExternal href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} title="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link> */}
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        {/* <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="flex flex-row gap-2 items-center border">
        <NavbarMenuToggle className="h-[2rem]" />
        <div className="flex flex-col gap-2 ">
          {cardItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="font-bold"
                style={{ color: theme === "dark" ? "#FFD445" : "#3771A3" }}
                // color={
                //   index === 2
                //     ? "primary"
                //     : index === cardItems.length - 1
                //       ? "danger"
                //       : "foreground"
                // }
                href={`#${item.id}`}
                size="lg"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
