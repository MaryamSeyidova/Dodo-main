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
    const icon = document.getElementById('icon');
    
    // Update theme icon
    themeIcon.src = document.body.classList.contains('night') ? '../moon.svg' : '../Sun.svg';
    
    // Update main icon
    icon.src = document.body.classList.contains('night') ? '../Icon2.svg' : '../Icon.svg';
    
    updateArrowIcons();
}

function toggleGifSwitching() {
    document.body.classList.toggle('night');
    const themeIcon = document.getElementById('theme-icon');
    themeIcon.src = document.body.classList.contains('icon') ? '../Icon2.svg' : '../Icon.svg';
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
        "../gif/matcha.gif",  /* matcha dino */
        "../gif/codedex.gif",
        "../gif/stopmotion.gif",
        "../gif/books.gif",
        "../gif/book-3.gif",
        "../gif/art.gif",
        "../gif/lights-openday.gif",
        "../gif/lights.gif",
        "../gif/shirt.gif",
        "../gif/cups.gif",
        // "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTVjcDhlOXN2cTNmMXhtYjJicnVydGYxc3Z1c2FzcmVtZ2lxMDNwZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xhX1qFxqmDNHG/giphy.gif",
        // "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjd2cjAza3lrZDh5eTV0aHRwY3A4MXQ4MjhoZWt6b29ndnByemljZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1Laym1dOTt2mSxIwdc/giphy.gif",
        // "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzdjYXg1aml0a2I5M3k4NnZoNmM3Y3lmNTd3YWZpNDh6Y3Jpbng3eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xFkbhJ4KFLW8twElm9/giphy.gif",/* stop motion */
        // "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWN3N2docXphd3owaXZ1ZDRwbGx2MW9hbTlyMWV3eHBoYmJjdTltdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c3PWmJWHxXgoo/giphy.gif", /* frame in a frame */
        // "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXkxcTBhdWpsYzl4Y3VjN3BjN2k1Zm0yd2NwZXkwNHA3a2M2c2I1YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/irBwKLGCy4sdWSmo3I/giphy.gif", /* apt dance*/
        // "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHVvc282bTB6YXgwNXJuMW9ocDB5d3ZrNm1tZ3U4dnlja283bHZiOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yovOUEWBV2R46yrQ0B/giphy.gif",
        // "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHgzY3NwMHRyMmdyYmprb3h3bHNvM2JlbnRkcXF2NmltcGNlNXd6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gpcoqb924ED3G/giphy.gif",
        // "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3NwYmJxZmV2M290ZHE4YzllZmFhZDVia2xwdGo2ZXNkbHE3eDI5MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14qr1Mxq2msDpm/giphy.gif", /*This is shapes */
        // "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVhMnZvOXcyODdhenFhZHh0Mndsdmt6aTVnbzMzNWkwcjBqeG00diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SbIQECWw0RLtcs7EtH/giphy.gif", /* Graph */
        // " https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ltdXpkejNhbzE5d2x0YW1pYjFmd3k3NDhzemJmZWcya3Juemo3NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUzoUmQuI9e7f6N14z/giphy.gif"
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

