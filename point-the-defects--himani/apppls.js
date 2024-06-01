document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);

let bigboxes = document.querySelectorAll(".lar");
let smolboxes = document.querySelectorAll(".smal");
var nSi = 0;
var nP = 0;
var nE = 16;
var nI = 0;
var gridFull = false;
var level = 1;

bigboxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.textContent !== "Si") {
            box.textContent = "Si";
            box.style.height = '65px';
            box.style.width = '65px';
            nSi += 1;
            nE -= 1;
        } else if (box.textContent == "Si") {
            box.textContent = " ";
            box.style.height = '60px';
            box.style.width = '60px';
            nSi -= 1;
            nE += 1;
        }
        showintice();
        levstate();
    });

    box.addEventListener("contextmenu", () => {
        box.textContent = document.querySelector('#sub').value;
        if (box.textContent == "Al") {
            box.style.height = '35px';
            box.style.width = '35px';
        } else if (box.textContent == "P") {
            box.style.height = '80px';
            box.style.width = '80px';
        }
        nP += 1;
        nE -= 1;
        showintice();
        levstate();
    });
});

smolboxes.forEach((box) => {
    box.addEventListener("click", () => {
        box.textContent = document.querySelector('#interstitial').value;
        nI += 1;
    });
});

button = document.querySelector('.fill');
button.addEventListener("click", () => {
    bigboxes.forEach((box) => {
        box.textContent = "Si";
        box.style.height = '65px';
        box.style.width = '65px';
        nSi = 16;
        nP = 0;
        nE = 0;
        gridFull = true;
    });
});

button.addEventListener("contextmenu", () => {
    bigboxes.forEach((box) => {
        box.textContent = "P";
        box.style.height = '65px';
        box.style.width = '65px';
        nP = 16;
        nSi = 0;
        nE = 0;
    });
});

function reset_lattice() {
    nE = 16;
    nSi = 0;
    nP = 0;
    bigboxes.forEach((box) => {
        box.textContent = " ";
        box.style.height = '60px';
        box.style.width = '60px';
    });
    smolboxes.forEach((box) => {
        box.textContent = " ";
    });
}

function levstate() {
    let levels = Array.from(document.querySelectorAll(".l"));
    levels.forEach((l1) => {
        let y = levels.findIndex(x1 => x1 == l1);
        if (y == level - 1) {
            levels[y].style.backgroundColor = "black";
            levels[y].style.color = "white";
        } else if (y < level - 1) {
            levels[y].style.backgroundColor = "lightgreen";
            levels[y].style.color = "black";
        }
    });
}
levstate();

function info() {
    let a1 = document.querySelector(".l_num");
    let a2 = document.querySelector(".l_what");
    let a3 = document.querySelector(".l_how");
    if (level == 1) {
        a1.textContent = "Level 1 : Vacancy Defect";
        a2.textContent = "Vacany Defect is a type of point defect in a solid where an atom is missing from one of the lattice points.";
        a3.textContent = "To Solve this level: Add 16 Si Atoms to the lattice and then remove an atom to create a vacancy defect.";
    } else if (level == 2) {
        a1.textContent = "Level 2 : Substitutional Defect";
        a2.textContent = "Substitutional Defect: When a foreign atom substitutes for a parent atom in the lattice.";
        a3.textContent = "To Solve this level: Add a pentavalent impurity in the lattice. Add 15 Si Atoms and 1 Phosphorous atom to create a substitutional defect.";
    } else if (level == 3) {
        a1.textContent = "Level 3 : Interstitial Defect";
        a2.textContent = "Interstitial Defect: a type of point crystallographic defect where an atom of the same or of a different type, occupies an interstitial site in the crystal structure.";
        a3.textContent = "To Solve this level: Add 16 Si Atoms and 1 Proton in the inner atoms to create an interstitial defect.";
    }
}
info();

function check_l1() {
    if (nSi == 16) {
        gridFull = true;
    }
    let result = document.querySelector('.result');
    if (nSi == 15 && nE == 1 && gridFull == true) {
        result.textContent = "Vacancy Defect";
        return true;
    } else {
        result.textContent = "No Vacancy Defect Found";
        return false;
    }
}

function check_l2() {
    let result = document.querySelector('.result');
    if (nP == 1 && gridFull == true) {
        result.textContent = "Substitutional defect";
        return true;
    } else {
        result.textContent = "No Substitutional Defect Found";
        return false;
    }
}

function check_l3() {
    let result = document.querySelector('.result');
    if (nI != 0 && level == 3) {
        result.textContent = "Interstitial defect";
        return true;
    } else {
        result.textContent = "No Interstitial Defect Found";
        return false;
    }
}

function showintice() {
    if (level == 1 || level == 2) {
        smolboxes.forEach((box) => {
            box.style.visibility = "hidden";
        });
    } else {
        smolboxes.forEach((box) => {
            box.style.visibility = "visible";
        });
    }
}
showintice();

function nextLevel() {
    level += 1;
    info();
    levstate();
    reset_lattice();
    showintice();
    document.querySelector('.next-level-button').style.display = 'none';
    document.querySelector('.result').textContent = "";
}

function submit() {
    if (level == 1) {
        if (check_l1() == true) {
            document.querySelector('.result').textContent = "Level 1 Cleared!";
            document.querySelector('.next-level-button').style.display = 'block';
        }
    } else if (level == 2) {
        if (check_l2() == true) {
            document.querySelector('.result').textContent = "Level 2 Cleared!";
            document.querySelector('.next-level-button').style.display = 'block';
        }
    } else if (level == 3) {
        if (check_l3() == true) {
            document.querySelector('.result').textContent = "Level 3 Cleared!";
            document.querySelector('.next-level-button').style.display = 'block';
        }
    }
}
