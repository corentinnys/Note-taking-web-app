import { useState } from 'react';
import Tags from "./Tags";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Notes from "./notes.jsx";
import Note from "./note.jsx";
import data from "./data/data.json";
import Login from "./Login"; // ⚠️ n'oublie pas

function App() {
    const [user, setUser] = useState(null);

    const [notes, setNotes] = useState(() => {
        return data.notes.map((note, index) => ({
            ...note,
            id: note.id || crypto.randomUUID?.() || `${Date.now()}-${index}`,
            archived: note.archived ?? false
        }));
    });

    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [view, setView] = useState("all");

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
    };

    const handleDeleteNote = (noteId) => {
        if (!noteId) return;

        const updatedNotes = notes.filter(note => note.id !== noteId);
        setNotes(updatedNotes);

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

    const handleSave = (newContent) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === selectedNote?.id
                    ? { ...note, content: newContent }
                    : note
            )
        );
    };

    const filteredNotes = notes.filter(note =>
        view === "archived" ? note.isArchived : !note.isArchived
    );

    // ✅ ICI le bon endroit pour le if
    if (!user) {
        return <Login onLogin={setUser} />;
    }

    const handleSearch = (e) => {
        const value = e.target.value;

        const result = notes.filter(note =>
            note.title.toLowerCase().includes(value.toLowerCase())
        );

        setNotes(result);
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <input type="text" placeholder="Search..."onChange={handleSearch}/>
                </div>
            </div>
            <div className="row">

                {/* Sidebar */}
                <div className="col-12 col-md-2">
                    <div onClick={() => setView("all")}>All notes</div>
                    <div onClick={() => setView("archived")}>Archived notes</div>
                    <h5>Tags</h5>
                    <Tags onTagClick={handleTagClick}/>
                </div>

                {/* Liste */}
                <div className="col-12 col-md-2">
                    <button className="btn btn-primary p-2">
                        Ajouter une note
                    </button>

                    <Notes
                        notes={filteredNotes}
                        selectedTag={selectedTag}
                        selectedNote={selectedNote}
                        onNoteClick={setSelectedNote}
                    />
                </div>

                {/* Détail */}
                <div className="col-12 col-md-6">
                    <Note selectedNote={selectedNote} handleSave={handleSave}/>
                </div>

                {/* Actions */}
                <div className="col-12 col-md-2">
                    <button onClick={() => setUser(null)}>
                        Logout
                    </button>

                    <ul>
                        <li
                            onClick={() => toggleArchive(selectedNote?.id)}
                            className="btn btn-sm text-white p-2 border"
                        >
                            {selectedNote?.archived ? "Unarchive notes" : "Archive note"}
                        </li>

                        <li>
                            <button
                                className="btn btn-sm text-white p-2 border"
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