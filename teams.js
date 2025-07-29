let players = [];

fetch('players.json')
    .then(res => res.json())
    .then(data => {
        players = data;
        filterByTeam('India'); // Default team
    });

function filterByTeam(team) {
    const scroller = document.getElementById('teamPlayerScroller');
    scroller.innerHTML = '';

    const teamPlayers = players.filter(p => p.team === team);

    teamPlayers.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
      <img src="${player.image}" alt="${player.name}" />
      <p>${player.name}</p>
    `;
        scroller.appendChild(card);
    });

    gsap.from(".player-card", {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });
}
