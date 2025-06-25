"use client";
import { useState, useRef, useEffect } from "react";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Country Map",
    href: "/country-view",
    description:
      "Country Map is a section where the total casualties, including deaths and injuries, are displayed as dots on the map, organized by district and hospital views. The red colour indicates the dead, while Orange denotes the injured.",
  },

  {
    title: "Incidents Map",
    href: "/effected-people",
    description:
      "In the Incident Map section, viewers can see the victims` names, along with their gender, occupation, Incident location, a description of the incident, and other relevant information by clicking each dot on the map. Each entry or incident is manually verified and analyzed by TGI`s forensics team.",
  },
];

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const dropdown = dropdownRef.current.querySelector(
        'div[class*="absolute"]'
      );
      if (dropdown) {
        const rect = dropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        if (rect.right > viewportWidth) {
          (dropdown as HTMLElement).style.right = "0";
          (dropdown as HTMLElement).style.left = "auto";
        } else {
          (dropdown as HTMLElement).style.right = "auto";
          (dropdown as HTMLElement).style.left = "";
        }
      }
    }
  }, [isOpen]);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="https://monsoonprotestsarchive.com" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent text-slate-700"
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              navigationMenuTriggerStyle(),
              "px-0 sm:px-4 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent text-slate-700"
            )}
          >
            <div className="flex items-center gap-2">
              <SquareArrowOutUpRightIcon size={16} />
              Map
            </div>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid gap-1 md:w-[200px]  max-h-[80vh] overflow-y-auto">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-slate-700"
                    >
                      <div className="text-sm font-medium leading-none">
                        {item.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* <NavigationMenuItem>
					<Link href="/investigations" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent text-slate-700',
							)}
						>
							Investigations
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem> */}

        {/* <NavigationMenuItem>
					<Link href="/films" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent text-slate-700',
							)}
						>
							Films
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem> */}

        {/* <NavigationMenuItem>
					<Link href="/timeline" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent text-slate-700',
							)}
						>
							Timeline
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem> */}

        {/* <NavigationMenuItem>
					<Link href="/methodology" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent text-slate-700',
							)}
						>
							Methodology
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem> */}

        {/* <NavigationMenuItem>
					<Link href="/articles" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent text-slate-700',
							)}
						>
							Media
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem> */}

        {/* <NavigationMenuItem>
					<Link href="/team" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'px-0 py-0 bg-transparent hover:bg-transparent hover:text-primary mx-2 focus:bg-transparent text-slate-700',
							)}
						>
							About
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
