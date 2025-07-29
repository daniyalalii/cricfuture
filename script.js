let players = [];

fetch('players.json')
    .then(res => res.json())
    .then(data => {
        players = data;
        displaySomePlayersPerTeam(2);
        document.getElementById("loader").style.display = "none";
        document.getElementById("loading-audio").pause();
    })
    .catch(() => {
        document.getElementById("playerScroller").innerHTML = "<p style='color:red;text-align:center;'>Error loading players.</p>";
    });

function displaySomePlayersPerTeam(limit = 3) {
    const grouped = {};
    const selected = [];

    for (const player of players) {
        if (!grouped[player.team]) grouped[player.team] = [];
        if (grouped[player.team].length < limit) {
            grouped[player.team].push(player);
            selected.push(player);
        }
    }

    displayPlayers(selected);
}


function displayPlayers(list) {
    const scroller = document.getElementById('playerScroller');
    scroller.innerHTML = '';

    list.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
      <img src="${player.image}" alt="${player.name}" />
      <p>${player.name}</p>
    `;
        card.onclick = () => showPlayerInfo(player);
        scroller.appendChild(card);
    });

    gsap.from(".player-card", {
        x: 100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });
}

function showPlayerInfo(player) {
    const sound = new Audio('assets/sounds/select.mp3');
    sound.play();

    const infoBox = document.getElementById("playerInfo");

    infoBox.innerHTML = `
    <img src="${player.image}" alt="${player.name}" />
    <div class="player-details">
      <h2>${player.name}</h2>
      <p><strong>Age:</strong> ${player.age}</p>
      <p><strong>Style:</strong> ${player.style}</p>
      <p><strong>Talent:</strong> ${player.talent}</p>
      <p><strong>ICC Trophies:</strong> ${generateTrophies(player.iccTrophies)} (${player.iccTrophies})</p>
      <p><strong>Rating:</strong> ${player.rating}</p>
      <div class="stat-bar"><span id="ratingBar"></span></div>
    </div>
  `;

    gsap.from("#playerInfo", {
        opacity: 0,
        x: -30,
        duration: 0.5,
        ease: "power2.out"
    });

    gsap.to("#ratingBar", {
        width: `${player.rating}%`,
        duration: 1,
        backgroundColor: "lime"
    });
}

function generateTrophies(count) {
    const svg = `<svg width="20" height="20" fill="gold" viewBox="0 0 24 24"><path d="M7 2v2H4v4a4 4 0 003 3.87V14h2v2h6v-2h2v-2.13A4 4 0 0020 8V4h-3V2H7zm11 4v2a2 2 0 01-2 2V6h2zm-12 0h2v4a2 2 0 01-2-2V6zm4 10h4v2h-4v-2z"/></svg>`;
    return Array(count).fill(svg).join('');
}

function playHover() {
    const hoverSound = new Audio('assets/sounds/hover.mp3');
    hoverSound.volume = 0.3;
    hoverSound.play().catch(() => { });
}
