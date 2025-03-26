document.addEventListener("DOMContentLoaded", () => {
    setGreeting();
    document.addEventListener("keydown", (event) => {
        if (event.key === "2") changeToRandomGif();
    });
    updateArrowIcons();
});

function setGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById("greeting");
    greeting.textContent = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";
}

const gifArray = [
    "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
    "https://media3.giphy.com/media/fX5cZemSfX1cMZYuUJ/giphy.gif",
    "https://media2.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",
    "https://media3.giphy.com/media/bpfrJ6bV1D3107TFJi/giphy.gif",
    "https://media2.giphy.com/media/fP3AqIomP4nrbv9Hzz/giphy.gif"
];

function changeToRandomGif() {
    document.getElementById("dodo-image").src = gifArray[Math.floor(Math.random() * gifArray.length)];
}

function toggleNightMode() {
    document.body.classList.toggle('night');
    const themeIcon = document.getElementById('theme-icon');
    themeIcon.src = document.body.classList.contains('night') ? '../moon.svg' : '../Sun.svg';
    updateArrowIcons();
}

function updateArrowIcons() {
    const backArrow = document.getElementById('back');
    const forwardArrow = document.getElementById('forward');
    const nightMode = document.body.classList.contains('night');
    backArrow.src = nightMode ? '../backwards-white.svg' : '../backwards-black.svg';
    forwardArrow.src = nightMode ? '../forward-white.svg' : '../forward-black.svg';
}

function showTasks() {
    document.getElementById('categories').classList.add('hidden');
    document.getElementById('tasks-container').classList.remove('hidden');
    document.getElementById('design-process').classList.add('hidden');
}

function showDesignProcess() {
    document.getElementById('categories').classList.add('hidden');
    document.getElementById('tasks-container').classList.add('hidden');
    document.getElementById('design-process').classList.remove('hidden');
}

function goBack() {
    document.getElementById('categories').classList.remove('hidden');
    document.getElementById('tasks-container').classList.add('hidden');
    document.getElementById('design-process').classList.add('hidden');
}

function goForward() {
    if (document.getElementById('tasks-container').classList.contains('hidden')) showTasks();
    else showDesignProcess();
}

document.addEventListener("DOMContentLoaded", () => {
    const notePanel = document.getElementById("notePanel");
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");
    const dateTime = document.getElementById("dateTime");

    if (localStorage.getItem("savedNote")) notePanel.innerText = localStorage.getItem("savedNote");

    function updateDateTime() {
        dateTime.innerText = new Date().toLocaleString();
    }
    updateDateTime();
    setInterval(updateDateTime, 60000);

    editBtn.addEventListener("click", () => {
        const isEditable = notePanel.contentEditable === "true";
        notePanel.contentEditable = isEditable ? "false" : "true";
        editBtn.innerText = isEditable ? "Edit" : "Done Editing";
        if (!isEditable) notePanel.focus();
    });

    saveBtn.addEventListener("click", () => {
        localStorage.setItem("savedNote", notePanel.innerText.trim());
        saveBtn.innerText = "Saved";
        saveBtn.classList.add("saved-state");
        setTimeout(() => {
            saveBtn.innerText = "Save";
            saveBtn.classList.remove("saved-state");
        }, 2000);
    });
});

