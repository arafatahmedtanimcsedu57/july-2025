"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { SquareArrowOutUpRightIcon } from "lucide-react";

const navigationItems = [
  {
    title: "Quick Look",
    href: "/",
    description: "District wise Deaths & Injuries.",
  },
  {
    title: "Individual",
    href: "/effected-people",
    description: "Area wise each Effected Person",
  },
];

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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

        // If dropdown extends beyond right edge of viewport
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
      >
        <SquareArrowOutUpRightIcon size={16} />
        Map View
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M6 8.5L2 4.5L2.7 3.8L6 7.1L9.3 3.8L10 4.5L6 8.5Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-popover rounded-md shadow-md right-0 md:right-auto">
          <ul className="grid gap-1 p-4 md:w-[200px] max-h-[80vh] overflow-y-auto">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="text-sm font-medium leading-none">
                    {item.title}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
