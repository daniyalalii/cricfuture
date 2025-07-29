let players = [];

fetch('players.json')
    .then(res => res.json())
    .then(data => {
        players = data;
        displayPlayers(players);
        animateCards();
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 2000);
    });

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
    <img src="${player.image}" alt="${player.name}" />
    <div class="player-details">
      <h2>${player.name}</h2>
      <p><strong>Age:</strong> ${player.age}</p>
      <p><strong>Style:</strong> ${player.style}</p>
      <p><strong>Talent:</strong> ${player.talent}</p>
      <p><strong>ICC Trophies:</strong> ${generateTrophies(player.iccTrophies)} (${player.iccTrophies})</p>
      <p><strong>Rating:</strong> ${player.rating}</p>
      <div class="stat-bar"><span style="width: ${player.rating}%;"></span></div>
    </div>
  `;

    gsap.from("#playerInfo", {
        opacity: 0,
        x: -30,
        duration: 0.5,
        ease: "power2.out"
    });
}

function generateTrophies(count) {
    const svg = `<svg width="20" height="20" fill="gold" viewBox="0 0 24 24"><path d="M7 2v2H4v4a4 4 0 003 3.87V14h2v2h6v-2h2v-2.13A4 4 0 0020 8V4h-3V2H7zm11 4v2a2 2 0 01-2 2V6h2zm-12 0h2v4a2 2 0 01-2-2V6zm4 10h4v2h-4v-2z"/></svg>`;
    return Array(count).fill(svg).join('');
}

function animateCards() {
    gsap.from(".player-card", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = players.filter(player => player.name.toLowerCase().includes(term));
    displayPlayers(filtered);
    animateCards();
});
