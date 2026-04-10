import { useRef } from "react";
function Notes({ notes, selectedTag, onNoteClick, selectedNote }) {
    // Filtrer par tag uniquement
    const filteredNotes = selectedTag
        ? notes.filter(note => note.tags && note.tags.includes(selectedTag.title))
        : notes;
    const noteRefs = useRef({});
    return (
        <div>
            {filteredNotes.map(note => (
                <div
                    key={note.id}
                    onClick={() => onNoteClick(note)}
                    className={`note-item fs-6 p-3 my-hover ${
                        selectedNote?.id === note.id ? "active-note" : ""
                    }`}
                    style={{ cursor: 'pointer', marginBottom: '10px' }}
                    ref={el => (noteRefs.current[note.id] = el)}
                >
                    <h3 className="fs-6">{note.title}</h3>

                    {note.tags && note.tags.map(tag => (
                        <span key={tag} className="badge bg-secondary ">
                            {tag}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Notes;