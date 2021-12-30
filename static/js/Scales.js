var starting_indices = {
    "A" : 0, "A#/Bb" : 1, "B" : 2, "C" : 3, "C#/Db" : 4, "D" : 5, 
        "D#/Eb" : 6, "E" : 7, "F" : 8, "F#/Gb" : 9, "G" : 10, "G#/Ab" : 11
};

var indice_jump_dictionary = {"Major" : [2,2,1,2,2,2,1], "Natural Minor" : [2,1,2,2,1,2,2], 
            "Harmonic Minor" : [2,1,2,2,1,3, 1], "Major Pentatonic" : [2,2,3,2,3],
            "Minor Pentatonic" : [3,2,2,3,2]}

var list_of_notes = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"]

function getScale(noteValue, scaleName)
{
    console.log(noteValue);
    console.log(scaleName);

    var index_jumps = indice_jump_dictionary[scaleName];
    console.log(index_jumps);
    var scale_list = [];

    var starting_indice = starting_indices[noteValue];
    var running_index_sum = 0;

    scale_list.push(list_of_notes[starting_indice])

    for (const x of index_jumps)
    {
        scale_list.push(list_of_notes[(starting_indice + running_index_sum + x) % 12])
        running_index_sum += x;
    }

    return scale_list;
}

// Called when the user clicks the submit button -- from here we find the current note and scale selected and then 
// generate that on the keyboard
function update(passed_document) 
{
    var note = passed_document.getElementById('Notes');
    var scale = passed_document.getElementById('Scales');

    var noteValue = note.options[note.selectedIndex].value;
    var scaleValue = scale.options[scale.selectedIndex].value;

    var scaleList = getScale(noteValue, scaleValue);
    drawScale(passed_document, scaleList); 
}

function clear(passed_document)
{
    for (const x of Object.keys(starting_indices))
    {
        console.log(x);
        passed_document.getElementById(x).style.opacity = 0;
    }
}

function drawScale(passed_document, scaleList)
{
    clear(passed_document);
    console.log(scaleList);

    for (const x of scaleList)
    {
        passed_document.getElementById(x).style.opacity = 0.65;
    }
}