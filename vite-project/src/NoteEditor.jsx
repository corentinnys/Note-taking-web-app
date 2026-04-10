import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

export default function NoteEditor({ selectedNote, onSave }) {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image,
            Placeholder.configure({
                placeholder: "Commence à écrire...",
            }),
        ],
        content: selectedNote?.content || "",
    });

    useEffect(() => {
        if (!editor) return;
        editor.commands.setContent(selectedNote?.content || "", false);
    }, [selectedNote, editor]);

    if (!editor) return null;

    const addImage = () => {
        const url = prompt("URL de l'image");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="editor-container" style={{ background: "#0E121B" +
                ""}}>

            {/* Toolbar minimaliste */}
            <div className="toolbar">
                <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}>•</button>
                <button onClick={addImage}>🖼</button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />

            {/* Actions */}
            <div className="actions">
                <button onClick={() => onSave(editor.getHTML())}>
                    Save
                </button>
            </div>

        </div>
    );
}