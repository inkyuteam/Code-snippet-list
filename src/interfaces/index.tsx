export interface snippetType {
  title: string;
  description: string;
  code: string;
  mode: string;
}

export interface SearchSnippetsProps {
  searchText: string;
  setSearchText: string;
  searchFilter: string;
  setSearchFilter: React.Dispatch<
    React.SetStateAction<"ALL" | "TITLE" | "DESCRIPTION">
  >;
}

export interface MenuBarProps {
  currentMenuIndex: number;
  menus: snippetType[];
  setMenuIndex: React.Dispatch<React.SetStateAction<number>>;
  setBinIndex: React.Dispatch<React.SetStateAction<boolean>>;
  addNewSnippet: () => void;
  searchText: string;
  searchFilter: string;
}

export interface SnippetHeaderProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  currentMode: string;
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>;
  setIsDescription: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DescriptionProps {
  index: number;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export interface CodeEditorProps {
  index: number;
  mode: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}
