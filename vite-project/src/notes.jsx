// notes.jsx
function Notes({ notes, selectedTag, onNoteClick }) {
    // Filtrer les notes par tag si nécessaire
    const filteredNotes = selectedTag
        ? notes.filter(note => note.tags && note.tags.includes(selectedTag.title))
        : notes;

    return (
        <div>
            {filteredNotes .filter(note => !note.archived)
                .map(note => (
                <div
                    key={note.id}
                    onClick={() => onNoteClick(note)}
                    style={{ cursor: 'pointer', marginBottom: '10px' }}
                >
                    {note.title}
                </div>
            ))}
        </div>
    );
}

export default Notes;