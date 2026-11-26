const engineContent = {
  source: {
    title: '+ de 15 ans de terrain',
    text: 'Rigueur, procédures, coordination et prise de décision dans des environnements sensibles.'
  },
  analysis: {
    title: 'Analyse',
    text: 'Observer une situation, distinguer les priorités et structurer une réponse claire avant d’agir.'
  },
  service: {
    title: 'Sens du service',
    text: 'Comprendre l’utilisateur, transmettre les bonnes informations et conserver une logique de solution concrète.'
  },
  core: {
    title: 'Systèmes + solutions',
    text: 'Comprendre les fondations techniques, relier les outils et construire une réponse adaptée au besoin rencontré.'
  },
  'output-a': {
    title: 'Fiabilité',
    text: 'Des systèmes et des solutions compréhensibles, testables et adaptés à un besoin clairement identifié.'
  },
  'output-b': {
    title: 'Adoption',
    text: 'Une technologie devient réellement utile lorsque les personnes qui travaillent avec elle la comprennent et peuvent se l’approprier.'
  }
};

const engineNodes = document.querySelectorAll('.engine-node');
const engineInspector = document.querySelector('#engineInspector');
engineNodes.forEach((node) => {
  node.addEventListener('click', () => {
    engineNodes.forEach((item) => item.classList.remove('active'));
    node.classList.add('active');
    const data = engineContent[node.dataset.engine];
    if (!engineInspector || !data) return;
    engineInspector.innerHTML = `<small>MODULE ACTIF</small><strong>${data.title}</strong><p>${data.text}</p>`;
  });
});

const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skill-map');
skillTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    skillTabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    skillPanels.forEach((panel) => panel.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.querySelector(`[data-panel="${tab.dataset.skill}"]`)?.classList.add('active');
  });
});

const careerData = {
  transition: {
    years: '2023 — 2026', state: 'transition', title: 'Montée en compétences · autodidacte', location: 'Bruxelles → Paris',
    points: [
      'Période consacrée à l’accompagnement familial et à la formation.',
      'Aide à l’utilisation de l’IA auprès de résidents et de personnel en EHPAD.',
      'Évolution progressive vers les systèmes et réseaux, le cloud, puis le No-Code, l’automatisation et l’IA appliquée.'
    ],
    tags: ['Résilience', 'Accompagnement', 'Veille professionnelle']
  },
  elia: {
    years: '2017 — 2023', state: 'opérationnel', title: 'Agent mobile, puis chef de poste', location: 'Securitas · site Elia · Bruxelles',
    points: [
      'Agent mobile jusqu’en 2019 environ : rondes et accompagnement des intervenants.',
      'Puis chef de poste, seul en poste la nuit et le week-end : priorités, alerte des bons interlocuteurs.',
      'Surveillance vidéo et intrusion, contrôle des accès : badges remis seulement après validation des responsables.',
      'Participation au déploiement d’une main courante électronique.'
    ],
    tags: ['Coordination', 'Procédures', 'Digitalisation']
  },
  g4s: {
    years: '2014 — 2017', state: 'terrain', title: 'Agent de sûreté polyvalent', location: 'G4S · Bruxelles',
    points: [
      'Missions en centres commerciaux, hôpitaux et gares.',
      'Dissuasion et intervention aux urgences hospitalières.',
      'Rondes d’ouverture et de fermeture.',
      'Plus de 100 vols détectés et signalés.',
      'Premiers renforts sur le site Elia dès 2016.'
    ],
    tags: ['Observation', 'Intervention', 'Service']
  },
  samsic: {
    years: '2012 — 2014', state: 'sécurité', title: 'SSIAP 1 & SSIAP 2', location: 'Samsic Sécurité · Levallois-Perret',
    points: [
      'Arrivée en novembre 2012, peu après l’ouverture : participation à la mise en place du poste de sécurité.',
      'SSIAP 1, puis chef d’équipe SSIAP 2 : coordination du PC sécurité.',
      'Répartition des tâches de deux agents SSIAP 1 en journée.',
      'Secours à personne : environ une dizaine par mois.',
      'Relais entre le client et la hiérarchie.'
    ],
    tags: ['Management', 'Relation client', 'Assistance']
  },
  goron: {
    years: '2006 — 2011', state: 'encadrement', title: 'SSIAP 1 & SSIAP 2', location: 'Goron S.A / Lancry Protection Sécurité · Groupama Noisy-le-Grand / Paris 8',
    points: [
      'Agent SSIAP 1 au PC sécurité des sites Groupama de Noisy-le-Grand (Goron).',
      'Remplacement du chef de site pendant environ un mois : plannings et couverture des postes.',
      'Chef d’équipe SSIAP 2 au siège Groupama Astorg (Lancry) : coordination du PC et des agents.',
      'Environ une centaine de permis de feu suivis ou préparés au total (Goron et Lancry).'
    ],
    tags: ['Encadrement', 'Planification', 'Responsabilité']
  }
};

const careerButtons = document.querySelectorAll('.career-step');
const careerDetail = document.querySelector('#careerDetail');
careerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    careerButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const data = careerData[button.dataset.career];
    if (!careerDetail || !data) return;
    careerDetail.animate([{ opacity: .55, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'ease-out' });
    careerDetail.innerHTML = `
      <div class="career-detail-top">
        <div><small>ÉTAPE ACTIVE</small><span>${data.years}</span></div>
        <span class="career-state"><i></i> ${data.state}</span>
      </div>
      <h3>${data.title}</h3>
      <p class="career-location">${data.location}</p>
      <ul>${data.points.map((point) => `<li>${point}</li>`).join('')}</ul>
      <div class="career-tags">${data.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
    `;
  });
});

const focusButton = document.querySelector('#focusMode');
focusButton?.addEventListener('click', () => {
  const active = document.body.classList.toggle('synth');
  focusButton.textContent = active ? 'Mode complet' : 'Mode synthèse';
});
