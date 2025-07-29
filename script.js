let players = [];

function playHover() {
    const hoverSound = new Audio('assets/sounds/hover.mp3');
    hoverSound.volume = 0.3;
    hoverSound.play().catch(() => { });
}

fetch('players.json')
    .then(res => res.json())
    .then(data => {
        players = data;
    });

document.addEventListener('DOMContentLoaded', () => {
    const playerList = document.getElementById('playerList');
    const loadingScreen = document.getElementById('loading-screen');
    const audio = document.getElementById('loading-audio');
    const searchInput = document.getElementById('searchInput');

    const infoPanel = document.createElement('div');
    infoPanel.className = 'player-info-panel';
    document.body.appendChild(infoPanel);

    setTimeout(() => {
        loadingScreen.style.display = 'none';
        audio.pause();
        playerList.style.display = 'flex';
        showFeaturedPlayers();
    }, 2500);

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = players.filter(p => p.name.toLowerCase().includes(query));
        renderPlayers(filtered);
    });

    function showFeaturedPlayers() {
        renderPlayers(players);
    }


    function renderPlayers(list) {
        playerList.innerHTML = '';
        list.forEach(player => {
            const card = document.createElement('div');
            card.className = 'player-card';
            card.innerHTML = `
        <img src="${player.image}" alt="${player.name}" />
        <p>${player.name}</p>
      `;
            card.onclick = () => showPlayerDetails(player);
            playerList.appendChild(card);
        });
    }

    function showPlayerDetails(player) {
        const selectSound = new Audio('assets/sounds/select.mp3');
        selectSound.play().catch(() => { });

infoPanel.innerHTML = `
  <button class="close-btn" title="Close">
    <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#f87171" stroke-width="2" stroke-linecap="round"/></svg>
  </button>
  <h2>${player.name}</h2>
  <div class="info">
    <img src="${player.image}" alt="${player.name}" />
    <div class="stats">
      <p><strong>Team:</strong> ${player.team}</p>
      <p><strong>Age:</strong> ${player.age}</p>
      <p><strong>Style:</strong> ${player.style}</p>
      <p><strong>Talent:</strong> ${player.talent}</p>
      <p><strong>ICC Trophies:</strong> ${player.iccTrophies}</p>
      <p><strong>Rating:</strong> ${player.rating}</p>
      <div class="stat-bar" style="width: 0%;"></div>
    </div>
  </div>
`;

setTimeout(() => {
  const bar = infoPanel.querySelector('.stat-bar');
  bar.style.width = player.rating + '%';
}, 100);

        infoPanel.style.display = 'block';

        infoPanel.querySelector('.close-btn').onclick = () => {
            infoPanel.style.display = 'none';
        };
    }
});
