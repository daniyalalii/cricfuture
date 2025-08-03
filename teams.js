let players = [];

function playHover() {
    const hoverSound = new Audio('assets/sounds/hover.mp3');
    hoverSound.volume = 999;
    hoverSound.play().catch(() => { });
}

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
        card.onclick = () => showPlayerDetails(player);
        container.appendChild(card);
    });
}

function showPlayerDetails(player) {
    const selectSound = new Audio('assets/sounds/select.mp3');
    selectSound.play().catch(() => { });

    const infoPanel = document.querySelector('.player-info-panel') || document.createElement('div');
    infoPanel.className = 'player-info-panel';
    document.body.appendChild(infoPanel);

    infoPanel.innerHTML = `
    <button class="close-btn" title="Close">
      <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/></svg>
    </button>
    <h2>${player.name}</h2>
    <div class="info">
      <img src="${player.image}" alt="${player.name}" />
      <div class="stats">
        <p><strong>Age:</strong> ${player.age}</p>
        <p><strong>Style:</strong> ${player.style}</p>
        <p><strong>Talent:</strong> ${player.talent}</p>
        <p><strong>ICC Trophies:</strong> ${player.iccTrophies}</p>
        <div class="stat-bar" style="width: ${player.rating}%"></div>
      </div>
    </div>
  `;

    infoPanel.querySelector('.close-btn').onclick = () => {
        infoPanel.remove();
    };
}
    const loadingScreen = document.getElementById('loading-screen');


    setTimeout(() => {
        loadingScreen.style.display = 'none';
        audio.pause();
    }, 2500);