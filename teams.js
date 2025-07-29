function playHover() {
    const hoverSound = new Audio('assets/sounds/hover.mp3');
    hoverSound.volume = 0.3;
    hoverSound.play().catch(() => { }); // for autoplay restrictions
}

let players = [];

fetch('players.json')
    .then(res => res.json())
    .then(data => {
        players = data;
    })
    .catch(() => {
        document.getElementById('teamError').innerText = "Failed to load player data.";
    });

function loadTeam(teamName) {
    const container = document.getElementById('teamPlayerScroller');
    const errorEl = document.getElementById('teamError');
    container.innerHTML = '';
    errorEl.textContent = '';

    if (!players.length) {
        errorEl.innerText = "Player data not available.";
        return;
    }

    const filtered = players.filter(p => p.team === teamName);

    if (filtered.length === 0) {
        errorEl.innerText = "No players found for this team.";
        return;
    }

    filtered.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
      <img src="${player.image}" alt="${player.name}" />
      <p>${player.name}</p>
    `;
        container.appendChild(card);
    });

    gsap.from(".player-card", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1
    });
}
