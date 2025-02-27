console.clear();

const team = [
	{
		rank: 1,
		name: 'Lewis Hamilton',
		handle: 'lewishamilton',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png',
		bugs: 36,
		sent: 31
	}, {
		rank: 2,
		name: 'Kimi Raikkonen',
		handle: 'kimimatiasraikkonen',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/K/KIMRAI01_Kimi_R%C3%A4ikk%C3%B6nen/kimrai01.png.transform/2col-retina/image.png',
		bugs: 31,
		sent: 21
	}, {
		rank: 3,
		name: 'Sebastian Vettel',
		handle: 'vettelofficial',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/S/SEBVET01_Sebastian_Vettel/sebvet01.png.transform/2col-retina/image.png',
		bugs: 24,
		sent: 7
	}, {
		rank: 4,
		name: 'Max Verstappen',
		handle: 'maxverstappen1',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col-retina/image.png',
		bugs: 22,
		sent: 4
	}, {
		rank: 5,
		name: 'Lando Norris',
		handle: 'landonorris',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col-retina/image.png',
		bugs: 18,
		sent: 16
	}, {
		rank: 6,
		name: 'Charles Leclerc',
		handle: 'charles_leclerc',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col-retina/image.png',
		bugs: 16,
		sent: 6
	}, {
		rank: 7,
		name: 'George Russell',
		handle: 'georgerussell63',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png',
		bugs: 10,
		sent: 21
	}, {
		rank: 8,
		name: 'Daniel Ricciardo',
		handle: 'danielricciardo',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danric01.png.transform/2col-retina/image.png',
		bugs: 7,
		sent: 46
	}, {
		rank: 9,
		name: 'Alexander Albon',
		handle: 'alex_albon',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col-retina/image.png',
		bugs: 4,
		sent: 2
	}, {
		rank: 10,
		name: 'Carlos Sainz Jr.',
		handle: 'carlossainz55',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col-retina/image.png',
		bugs: 1,
		sent: 24
	}
];

team.forEach(member => {
	let newRow = document.createElement('li');
	newRow.classList = 'c-list__item';
	newRow.innerHTML = `
		<div class="c-list__grid">
			<div class="c-flag c-place u-bg--transparent">${member.rank}</div>
			<div class="c-media">
				<img class="c-avatar c-media__img" src="${member.img}" />
				<div class="c-media__content">
					<div class="c-media__title">${member.name}</div>
					<a class="c-media__link u-text--small" href="https://instagram.com/${member.handle}" target="_blank">@${member.handle}</a>
				</div>
			</div>
			<div class="u-text--right c-kudos">
				<div class="u-mt--8">
					<strong>${member.bugs}</strong>
				</div>
			</div>
		</div>
	`;
	if(member.rank === 1) {
		newRow.querySelector('.c-place').classList.add('u-text--dark')
		newRow.querySelector('.c-place').classList.add('u-bg--yellow')
		newRow.querySelector('.c-kudos').classList.add('u-text--yellow')
	} else if(member.rank === 2) {
		newRow.querySelector('.c-place').classList.add('u-text--dark')
		newRow.querySelector('.c-place').classList.add('u-bg--teal')
		newRow.querySelector('.c-kudos').classList.add('u-text--teal')
	} else if(member.rank === 3) {
		newRow.querySelector('.c-place').classList.add('u-text--dark')
		newRow.querySelector('.c-place').classList.add('u-bg--orange')
		newRow.querySelector('.c-kudos').classList.add('u-text--orange')
	}
	list.appendChild(newRow)
})

// Find Winner from sent kudos by sorting the drivers in the team array
let sortedTeam = team.sort((a, b) => b.sent - a.sent)
let winner = sortedTeam[0]

// Render winner card
const winnerCard = document.getElementById('winner')
winnerCard.innerHTML = `
	<div class="u-text-small u-text--medium u-mb--16">Top Debugger Last Week</div>
	<img class="c-avatar c-avatar--lg" src="${winner.img}"/>
	<h3 class="u-mt--16">${winner.name}</h3>
	<span class="u-text--18 u-text--teal u-text--small"><a class="c-media__link u-text--small">@${winner.name}</a></span>
`