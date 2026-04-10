import React, { useState, useRef, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react';
import NoteEditor from "./NoteEditor.jsx";
function Note({ selectedNote, handleSave }) {

    return (
        <>
            <NoteEditor selectedNote={selectedNote} onSave={handleSave} />
        </>
    );
}

export default Note;