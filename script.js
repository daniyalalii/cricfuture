const players = [
    {
        name: "Virat Kohli",
        age: 35,
        style: "Right-hand batsman",
        talent: "Chase master",
        iccTrophies: 3,
        image: "assets/players/virat.png",
    },
    {
        name: "Babar Azam",
        age: 29,
        style: "Right-hand batsman",
        talent: "Cover drives",
        iccTrophies: 0,
        image: "assets/players/babar.png",
    },
];

const scroller = document.getElementById('playerScroller');
const infoBox = document.getElementById('playerInfo');
const searchInput = document.getElementById('search');

function displayPlayers(list) {
    scroller.innerHTML = '';
    list.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `<img src="${player.image}" alt="${player.name}" /><p>${player.name}</p>`;
        card.onclick = () => showPlayerInfo(player);
        scroller.appendChild(card);
    });
}

function showPlayerInfo(player) {
    const sound = new Audio('assets/sounds/select.mp3');
    sound.play();

    infoBox.innerHTML = `
    <h2>${player.name}</h2>
    <p><strong>Age:</strong> ${player.age}</p>
    <p><strong>Style:</strong> ${player.style}</p>
    <p><strong>Talent:</strong> ${player.talent}</p>
    <p><strong>ICC Trophies:</strong> ${player.iccTrophies}</p>
  `;
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = players.filter(player => player.name.toLowerCase().includes(term));
    displayPlayers(filtered);
});

displayPlayers(players);
