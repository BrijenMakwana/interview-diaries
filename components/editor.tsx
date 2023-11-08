"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  darkDefaultTheme,
  Theme,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";

const theme = {
  ...darkDefaultTheme,
  componentStyles: (theme) => ({
    Menu: {
      ".mantine-Menu-item[data-hovered], .mantine-Menu-item:hover": {
        backgroundColor: "#FFB457",
        color: "#000",
      },
    },
    Toolbar: {
      ".mantine-Menu-dropdown": {
        ".mantine-Menu-item:hover": {
          backgroundColor: "#FFB457",
          color: "#000",
        },
      },
    },
  }),
} satisfies Theme;

interface IEditor {
  setArticle: Dispatch<SetStateAction<string>>;
}

const Editor: FC<IEditor> = (props) => {
  const { setArticle } = props;

  const editor: BlockNoteEditor | null = useBlockNote({
    onEditorContentChange: (editor) => {
      const saveBlocksAsMarkdown = async () => {
        const markdown: string = await editor.blocksToMarkdown(
          editor.topLevelBlocks
        );
        setArticle(markdown);
      };
      saveBlocksAsMarkdown();
    },
  });

  return <BlockNoteView editor={editor} theme={theme} />;
};

export default Editor;
