const selectStreet = document.getElementById("selectStreet");
const streetReset = document.getElementById("streetReset");
const containerBuilding = document.querySelector(".building");
const quartier = document.getElementById("quartier");
const options = selectStreet.querySelectorAll("option");

function valueToName(value) {
    for (let i = 0; i < options.length; i++) {
        if (options[i].value == value) {
            return options[i].innerHTML;
        }
    }
}

function randomNbBuilding() {
    return Math.floor(Math.random() * 4) + 1;
}

class Quartier {
    constructor(value, nbBuilding) {
        this.value = value;
        this.name = valueToName(value);
        this.nbBuilding = nbBuilding;
    }

    static setNbBuilding(nbBuilding) {
        this.nbBuilding = nbBuilding;
    }

    toString() {
        if (this.nbBuilding != 4) return this.name + " : " + this.nbBuilding + " bâtiments";
        return this.name + " : vous pouvez construire une gare";
    }

    equals(quartier) {
        return this.value == quartier.value;
    }

    toJSON() {
        return {
            value: this.value,
            name: this.name,
            nbBuilding: this.nbBuilding
        };
    }
}

let memory = [];

function initMemory() {
    const memoryJSON = localStorage.getItem("memory");
    if (memoryJSON != null) {
        memory = JSON.parse(memoryJSON);
        memory.forEach(function (quartier) {
            quartier.__proto__ = Quartier.prototype;
        });
    } else {
        memory = [];
        for (let i = 0; i < options.length; i++) {
            memory.push(new Quartier(options[i].value, 0));
        }
    }
}

function saveMemory() {
    localStorage.setItem("memory", JSON.stringify(memory));
}

function setMemory(value, nbBuilding) {
    for (let i = 0; i < memory.length; i++) {
        if (memory[i].value == value) {
            memory[i].nbBuilding = nbBuilding;
        }
    }
    saveMemory();
}

function isInMemory(value) {
    for (let i = 0; i < memory.length; i++) {
        if (memory[i].value == value) {
            return (memory[i].nbBuilding > 0);
        }
    }

    return false;
}

function getMemory(value) {
    for (let i = 0; i < memory.length; i++) {
        if (memory[i].value == value) {
            return memory[i];
        }
    }
}

function randomize(value) {
    quartier.innerHTML = "En attente de la génération du nombre de bâtiments...";
    selectStreet.disabled = true;
    setTimeout(function () {
        let nbBuilding = randomNbBuilding();
        setMemory(value, nbBuilding);
        quartier.innerHTML = getMemory(value).toString();
        selectStreet.disabled = false;
    }, 1000);
}

selectStreet.addEventListener("change", function () {
    let value = selectStreet.value;
    let quartierObj = getMemory(value);

    if (isInMemory(value)) {
        quartier.innerHTML = getMemory(value).toString();
    } else {
        randomize(value);
    }
});

streetReset.addEventListener("click", function () {
    let value = selectStreet.value;
    randomize(value);
});

initMemory();