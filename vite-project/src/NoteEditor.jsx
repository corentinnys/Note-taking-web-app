import React, { useRef, useEffect } from "react";
import EditorToolbar from "./EditorToolbar.jsx";
import "./NoteEditor.css";

export default function NoteEditor({ selectedNote, onSave }) {
    const editorRef = useRef(null);
    const contentRef = useRef("");

    // 👉 Met à jour le contenu quand la note change
    useEffect(() => {
        if (editorRef.current) {
            const html = selectedNote?.content || "";
            editorRef.current.innerHTML = html;
            contentRef.current = html;
        }
    }, [selectedNote]);

    if (!selectedNote) {
        return <div>Sélectionne ou crée une note</div>;
    }

    const exec = (cmd, val = null) => {
        editorRef.current.focus();
        document.execCommand(cmd, false, val);
        contentRef.current = editorRef.current.innerHTML;
    };

    return (
        <div className="editor-container">
            <EditorToolbar exec={exec} />

            <div
                ref={editorRef}
                className="rich-editor"
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => {
                    contentRef.current = e.currentTarget.innerHTML;
                }}
            />

            <button onClick={() => onSave(contentRef.current)}>
                Save
            </button>
            <button >
                Annuler
            </button>
        </div>
    );
}