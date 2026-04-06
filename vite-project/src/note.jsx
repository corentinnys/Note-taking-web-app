import React, { useState, useRef, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react';
import NoteEditor from "./NoteEditor.jsx";
function Note({ selectedNote }) {

    return (
        <>
            <NoteEditor selectedNote={selectedNote} />
        </>
    );
}

export default Note;