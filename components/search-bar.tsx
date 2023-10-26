import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/components/icons";
import { Kbd } from "@nextui-org/kbd";
import { Dispatch, FC, SetStateAction, useRef, useEffect } from "react";

interface ISearchBar {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const SearchBar: FC<ISearchBar> = (props) => {
  const { value, setValue } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      if (
        event.key === "k" &&
        (event.metaKey || event.ctrlKey) // For Command+K on Mac
      ) {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, []);

  return (
    <Input
      ref={inputRef}
      aria-label="Search"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      classNames={{
        inputWrapper: "bg-default-100 w-8/12 self-center",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search for companies..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
};

export default SearchBar;
