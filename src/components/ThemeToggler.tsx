import { ChevronDown, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const ThemeToggler = ({ animation = false }: { animation?: boolean }) => {
  const theme = [
    { label: "Default", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "Cupcake", value: "cupcake" },
    { label: "Bumblebee", value: "bumblebee" },
    { label: "Emerald", value: "emerald" },
    { label: "Corporate", value: "corporate" },
    { label: "Synthwave", value: "synthwave" },
    { label: "Retro", value: "retro" },
    { label: "Cyberpunk", value: "cyberpunk" },
    { label: "Valentine", value: "valentine" },
    { label: "Halloween", value: "halloween" },
    { label: "Garden", value: "garden" },
    { label: "Forest", value: "forest" },
    { label: "Aqua", value: "aqua" },
    { label: "Lofi", value: "lofi" },
    { label: "Pastel", value: "pastel" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Wireframe", value: "wireframe" },
    { label: "Black", value: "black" },
    { label: "Dim", value: "dim" },
    { label: "Nord", value: "nord" },
    { label: "Sunset", value: "sunset" },
    { label: "Luxury", value: "luxury" },
    { label: "Dracula", value: "dracula" },
    { label: "CMYK", value: "cmyk" },
    { label: "Autumn", value: "autumn" },
    { label: "Business", value: "business" },
    { label: "Acid", value: "acid" },
    { label: "Lemonade", value: "lemonade" },
    { label: "Night", value: "night" },
    { label: "Coffee", value: "coffee" },
    { label: "Winter", value: "winter" },
  ];

  const [selectedTheme, setSelectedTheme] = useState<string>("coffee");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    setSelectedTheme(currentTheme);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    handleThemeChange(selectedTheme);
  }, [selectedTheme]);

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    localStorage.setItem("theme", value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <details
      ref={dropdownRef}
      className="dropdown dropdown-end"
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
    >
      <summary
        tabIndex={0}
        role="button"
        className={`btn m-1 px-7 py-3 flex items-center space-x-2 ${
          animation ? "transition-transform duration-300" : ""
        }`}
      >
        <div
          className={`flex items-center justify-center ${
            animation
              ? `transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`
              : ""
          }`}
        >
          <Sun size={16} />
        </div>
        <ChevronDown size={16} />
      </summary>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 overflow-y-auto block h-80 shadow-2xl"
      >
        {theme.map((item) => (
          <li key={item.value}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start text-current"
              aria-label={item.label}
              value={item.value}
              checked={selectedTheme === item.value}
              onChange={() => handleThemeChange(item.value)}
            />
          </li>
        ))}
      </ul>
    </details>
  );
};

export default ThemeToggler;
