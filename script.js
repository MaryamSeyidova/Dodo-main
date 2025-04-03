document.addEventListener("DOMContentLoaded", () => {
    setGreeting();
    document.addEventListener("keydown", (event) => {
        if (event.key === "2") changeToRandomGif();
    });
    updateArrowIcons();
});

// function setGreeting() {
//     const hour = new Date().getHours();
//     const greeting = document.getElementById("greeting");
//     greeting.textContent = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";
// }

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

let gifInterval;
let showingGifs = false;

function toggleGifSwitching() {
    const matchaImage = document.querySelector('.matcha-image');
    const gifArray = [
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXZmNXMwc2J0ZTM0d2ZhdmlkNGdyZHVlMHMzdTV3dXQ2eTNlOXlvciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vKL22hghkGict16qC9/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmp2NTlybzRqcXV0ZmR1Znkzcmhub243aXZheWs1eXRldDF0NHAxbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zkLycv9HZXyJgaNLpj/giphy.gif",
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjd2cjAza3lrZDh5eTV0aHRwY3A4MXQ4MjhoZWt6b29ndnByemljZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1Laym1dOTt2mSxIwdc/giphy.gif",
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTdiZnlreDVqYnQ4cnpicXpyNG1nMG0xaGUzNmRxbGx0czYza2Z1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CibMYDbrlvnFyjY2Ag/giphy.gif",
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXVxbGF0Z3VsZDZscXN0MnhpcGdrNnlxem1rdDNxYXgxdDRvcnU1YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9w9Z2ZOxcbs1a/giphy.gif",
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTZ1dXJkc3puMTQwZDJ2aXUwZ3A5bWV4eDhtczNrOWlncDBhZnM5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NFA61GS9qKZ68/giphy.gif",
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHM3ZDY3dHczNnk2Y2FwZHR2bmFpZ2drMXUwMTFqcHo4a3A2MG5oMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tFSqMSMnzPRTAdvKyr/giphy.gif", /* pup */
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm10aDUza2I0eTMybTY3enFrY2o2NGl5YXI1NXk3aXprbDR1M2VxMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zINs6k7lwfawSbLOIc/giphy.gif", /* pup dance */
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXkxcTBhdWpsYzl4Y3VjN3BjN2k1Zm0yd2NwZXkwNHA3a2M2c2I1YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/irBwKLGCy4sdWSmo3I/giphy.gif", /* apt dance*/
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHVvc282bTB6YXgwNXJuMW9ocDB5d3ZrNm1tZ3U4dnlja283bHZiOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yovOUEWBV2R46yrQ0B/giphy.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHgzY3NwMHRyMmdyYmprb3h3bHNvM2JlbnRkcXF2NmltcGNlNXd6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gpcoqb924ED3G/giphy.gif",
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHpxMXI2bXl5dHF6cWJneDltcmc2Njh0dDA3MDU4ZjFidTdxbnF0MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iqatr9kJTDezD9YLpZ/giphy.gif", /*This are Notes */
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG1yeTI4cHBmZTBqYWU5a2JhbHV6empncGd0dzI4aWQwY3Y1cmw4cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41m3kXt4r96Sb3AQ/giphy.gif",
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3NwYmJxZmV2M290ZHE4YzllZmFhZDVia2xwdGo2ZXNkbHE3eDI5MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14qr1Mxq2msDpm/giphy.gif", /*This is shapes */
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVhMnZvOXcyODdhenFhZHh0Mndsdmt6aTVnbzMzNWkwcjBqeG00diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SbIQECWw0RLtcs7EtH/giphy.gif", /* Graph */
        " https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ltdXpkejNhbzE5d2x0YW1pYjFmd3k3NDhzemJmZWcya3Juemo3NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUzoUmQuI9e7f6N14z/giphy.gif"
    ];

    if (showingGifs) {
        // Stop showing GIFs and revert to matcha.svg
        clearInterval(gifInterval);
        matchaImage.src = "../matcha.svg";
        showingGifs = false;
    } else {
        // Show a random GIF instantly
        const randomGif = gifArray[Math.floor(Math.random() * gifArray.length)];
        matchaImage.src = randomGif;

        // Start switching random GIFs every 3 seconds
        gifInterval = setInterval(() => {
            const randomGif = gifArray[Math.floor(Math.random() * gifArray.length)];
            matchaImage.src = randomGif;
        }, 3000);
        showingGifs = true;
    }
}

document.getElementById('icon').addEventListener('click', toggleGifSwitching);

