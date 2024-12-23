import { ThemeEnum } from "@/enums/Theme";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (theme) {
      setName(theme);
    }
  }, [theme]);

  const handleSetTheme = () => {
    switch (name) {
      case ThemeEnum.DARK:
        setTheme(ThemeEnum.LIGHT);
        break;
      case ThemeEnum.LIGHT:
        setTheme(ThemeEnum.DARK);
        break;
    }
  };

  return (
    <Fragment>
      <Button variant="ghost" size="icon" className="hover:text-primary" onClick={() => handleSetTheme()}>
        {name === ThemeEnum.DARK && <Sun />}
        {name === ThemeEnum.LIGHT && <Moon />}
      </Button>
    </Fragment>
  );
}
