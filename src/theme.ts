import { useHotkeys, useLocalStorage } from "@mantine/hooks";

export function useThemeToggle() {
  const [colorScheme, setColorScheme] = useLocalStorage<"light" | "dark">({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = () =>
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return { colorScheme, toggleColorScheme };
}
