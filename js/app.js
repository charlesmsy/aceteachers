const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];
let assignmentsList = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = assignmentsList.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        console.log(hpCharacters);
        hpCharacters = await res.json();
        console.log(hpCharacters);
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const loadAssignmnets = async () => {
    try {
        const res2 = await fetch('https://dmwxjh34he.execute-api.us-east-1.amazonaws.com/dev/EZAFunc/assignments/');
        console.log(assignmentsList);
        assignmentsList = await res2.json();
        console.log(assignmentsList);
        displayCharacters(assignmentsList);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>Hours to Complete: ${character.average_hours_to_complete}</p>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

//loadCharacters();
loadAssignmnets();
