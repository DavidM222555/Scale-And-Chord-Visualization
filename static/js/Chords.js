
// A dictionary (object rather) for having a consistent indexing into the notes of a scale or chord
var starting_indices = {
    "A" : 0, "A#/Bb" : 1, "B" : 2, "C" : 3, "C#/Db" : 4, "D" : 5, 
        "D#/Eb" : 6, "E" : 7, "F" : 8, "F#/Gb" : 9, "G" : 10, "G#/Ab" : 11
};

// Another dictionary (object) that stores the jumps necessary to construct certain scales.
var indice_jump_dictionary = {"Major" : [2,2,1,2,2,2,1], "Natural Minor" : [2,1,2,2,1,2,2], 
            "Harmonic Minor" : [2,1,2,2,1,3, 1], "Major Pentatonic" : [2,2,3,2,3],
            "Minor Pentatonic" : [3,2,2,3,2]}


var chord_index_jumps = {"Major": [0,2,4], "Minor" : [0,2,4], "Major Seventh" : [0,2,4,6], }

// Tells us which scale we should use to construct a chord
var chord_scale_dictionary = {"Major": "Major", "Minor": "Natural Minor", "Major Seventh": "Major"}

var list_of_notes = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"]

// Given a note_value and a scale name we construct a list that contains the notes of that scale
function getScale(note_value, scale_name)
{
    var index_jumps = indice_jump_dictionary[scale_name];
    console.log(index_jumps);
    scale_list = [];

    var starting_indice = starting_indices[note_value];
    var running_index_sum = 0;

    scale_list.push(list_of_notes[starting_indice])

    for (const x of index_jumps) // Iterate over the index jumps for the given scale and gather the notes in that scale
    {
        scale_list.push(list_of_notes[(starting_indice + running_index_sum + x) % 12])
        running_index_sum += x;
    }

    return scale_list;
}

function getChord(note_value, chord_name)
{
    console.log(note_value);
    console.log(chord_name);

    var scale_chord_uses = chord_scale_dictionary[chord_name];
    var scale_for_chord = getScale(note_value, scale_chord_uses);

    var chord_indices = chord_index_jumps[chord_name];

    var chord_list = [];

    for (const x of chord_indices)
    {
        chord_list.push(scale_for_chord[x]);
    }

    return chord_list;
}

// Called when the user clicks the submit button -- from here we find the current note and scale selected and then 
// generate that on the keyboard
function update(passed_document) 
{
    var note = passed_document.getElementById('Notes');
    var chord = passed_document.getElementById('Chords');

    var note_value = note.options[note.selectedIndex].value;
    var chord_value = chord.options[chord.selectedIndex].value;

    var chord_list = getChord(note_value, chord_value);
    drawChord(passed_document, chord_list); 
}

// Modifies all the dots in the scale to have 0 opacity and thus be invisible on the screen
function clear(passed_document)
{
    for (const x of Object.keys(starting_indices))
    {
        passed_document.getElementById(x).style.opacity = 0;
    }
}

// Draws the scale onto the piano
function drawChord(passed_document, chord_list)
{
    clear(passed_document);
    console.log(chord_list);

    for (const x of chord_list)
    {
        passed_document.getElementById(x).style.opacity = 0.65;
    }
}