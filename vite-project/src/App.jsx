import { useState } from 'react';
import Tags from "./Tags";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Notes from "./notes.jsx";
import Note from "./note.jsx";
import data from "./data/data.json";

function App() {
    // ✅ État pour la liste des notes (initialisé avec le JSON)
    const [notes, setNotes] = useState(() => {
        return data.notes.map((note, index) => ({
            ...note,
            id: note.id || crypto.randomUUID?.() || `${Date.now()}-${index}`,
            archived: note.archived ?? false // ✅ IMPORTANT
        }));
    });
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);

    const handleTagClick = (tag) => {
        setSelectedTag(tag);

    };

    const handleDeleteNote = (noteId) => {
        if (!noteId) return;
        const updatedNotes = notes.filter(note => note.id !== noteId);
        setNotes(updatedNotes);   // ← mise à jour de la liste

        // Si la note supprimée était sélectionnée, on nettoie
        if (selectedNote && selectedNote.id === noteId) {
            setSelectedNote(null);
        }
    };
    const toggleArchive = (id) => {
        setNotes(
            notes.map((note) =>
                note.id === id
                    ? { ...note, isArchived: !note.isArchived }
                    : note
            )
        );
    };

    const [view, setView] = useState("all");
    const filteredNotes = notes.filter(note =>
        view === "archived" ? note.isArchived : !note.isArchived
    );
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <div onClick={() => setView("all")}>All notes</div>
                    <div onClick={() => setView("archived")}>Archived notes</div>
                    <h5>Tags</h5>
                    <Tags onTagClick={handleTagClick} />
                </div>

                <div className="col-2">
                    <button type="button" className="btn btn-primary">
                        ajouter une nouvelle note
                    </button>
                    {/* ✅ On transmet la liste dynamique 'notes' */}
                    <Notes
                        notes={filteredNotes}
                        selectedTag={selectedTag}
                        onNoteClick={setSelectedNote}
                    />
                </div>

                <div className="col-6">
                    <Note selectedNote={selectedNote} />
                </div>

                <div className="col-2">
                    <ul>
                        <li onClick={() => toggleArchive(selectedNote?.id)}>
                            {selectedNote?.archived===false ? "Unarchive notes" : "Archive note"}
                        </li>
                        <li>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteNote(selectedNote?.id)}
                                disabled={!selectedNote}
                            >
                                Supprimer la note
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;