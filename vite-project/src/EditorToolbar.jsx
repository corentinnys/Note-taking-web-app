import React from "react";

export default function EditorToolbar({ exec }) {
    return (
        <div className="toolbar">
            <button onClick={() => exec("bold")}><b>B</b></button>
            <button onClick={() => exec("italic")}><i>I</i></button>
            <button onClick={() => exec("underline")}><u>U</u></button>
            <button onClick={() => exec("formatBlock","H1")}>H1</button>
            <button onClick={() => exec("formatBlock","BLOCKQUOTE")}>❝</button>
            <button onClick={() => exec("insertUnorderedList")}>• List</button>
            <button onClick={() => exec("insertOrderedList")}>1. List</button>
        </div>
    );
}