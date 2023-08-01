const main = document.querySelector("#main")
const btn = document.querySelector("#btn")
const succMsg = document.querySelector("#succMsg")
function show() {
    succMsg.style.display = "block";
    succMsg.style.opacity = "1";
}
const saveNote = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    console.log(data);
    if (data.length === 0) {
        localStorage.removeItem("notes")
    }
    else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
    show();
    setTimeout((show) => {
        succMsg.style.display = "none";
    }, 3000);
}

btn.addEventListener(
    "click",
    function () {
        addNote();
    }
)



const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash-can"></i>
        <i class="fa-solid fa-circle-plus"></i>
    </div>
    <textarea>${text}</textarea>
    `;

    note.querySelector(".trash").addEventListener(
        "click",
        function () {
            note.remove();
            saveNote();
        }
    )
    note.querySelector(".save").addEventListener(
        "click",
        function () {
            saveNote();
        }
    )
    main.appendChild(note);
}

(
    function () {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote()
        }
        else {
            lsNotes.forEach(
                (lsNotes) => {
                    addNote(lsNotes);
                }
            );
        }
        // if (lsNotes.length === 0) {
        //     localStorage.removeItem("notes")
        // }
        // else {
        //     addNote()
        // }
    }
)();

const searchInput = document.getElementById("searchInput");
const note = document.querySelectorAll(".note");

searchInput.addEventListener(
    "input",
    function () {
        //we use toLowerCase() for making the input case-insensitive
        const searchQuery = searchInput.value.toLowerCase();
        note.forEach(
            (note) => {
                //we made the textArea inputs case-insensitive.
                const textArea = note.querySelector("textarea")
                const noteContent = textArea.value.toLowerCase()
                //checking if the searched inputs match with the data stored in the notes.
                if (noteContent.includes(searchQuery)) {
                    note.style.display = "block";
                }
                else {
                    note.style.display = "none";
                }
            }

        );
    }
);