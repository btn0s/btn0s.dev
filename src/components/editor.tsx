"use client";

import { useCallback } from "react";

import { Link1Icon } from "@radix-ui/react-icons";
import { Color } from "@tiptap/extension-color";
import { Link } from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BoldIcon, ListIcon, ListOrderedIcon } from "lucide-react";

import { updateEntryContent } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Entry } from "@/types";

const Editor = ({ type, slug, content }: Entry) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Color,
      TextStyle,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm prose-invert w-full max-w-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const documentAsJson = editor.getJSON();

      console.log("Editor updated:", documentAsJson);

      void updateEntryContent({
        type,
        slug,
        content: JSON.stringify(documentAsJson, null, 2),
      });
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  return (
    <>
      {editor ? (
        <BubbleMenu editor={editor}>
          <div className="flex w-fit max-w-none justify-between gap-1 rounded-md border border-border bg-background p-1 text-xs text-muted-foreground shadow-sm">
            <Button
              size="sm"
              variant="ghost"
              className={cn({
                "bg-white text-black": editor.isActive("bold"),
              })}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <BoldIcon className="size-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={cn({
                "bg-white text-black": editor.isActive("link"),
              })}
              onClick={setLink}
            >
              <Link1Icon className="size-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={cn({
                "bg-white text-black": editor.isActive("bulletList"),
              })}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <ListIcon className="size-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={cn({
                "bg-white text-black": editor.isActive("orderedList"),
              })}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrderedIcon className="size-3" />
            </Button>
          </div>
        </BubbleMenu>
      ) : null}
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
