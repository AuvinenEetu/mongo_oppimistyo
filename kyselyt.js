// Kyselyitä joilla voi testata kannan toimintaa

// Tietyn pelaajan avoimet vedot
db.bets.find(
  {
    pelaaja_id: ObjectId('69cbc5cb682d2e234d338351'),
    tila: 'avoin',
  },
  {
    _id: 0,
    pelaaja_id: 0,
    tapahtuma_id: 0,
  },
);

// Tietyn pelaajan vetojen historia
db.bets
  .find(
    {
      pelaaja_id: ObjectId('69cbc5cb682d2e234d338351'), // Matin ID
      tila: { $in: ['voitto', 'häviö'] },
    },
    {
      _id: 0,
      pelaaja_id: 0,
      tapahtuma_id: 0,
    },
  )
  .sort({ luotu_pvm: -1 });

// Haetaan kaikki kuluvan vuoden tapahtumat
db.events
  .find({
    alkamisaika: {
      $gte: ISODate('2026-01-01T00:00:00Z'),
      $lte: ISODate('2026-12-31T23:59:59Z'),
    },
    status: 'avoin',
  })
  .sort({ alkamisaika: 1 });

// Merkitään tapahtuma ratkaistuksi
db.events.updateOne(
  { nimi: 'Valioliiga: Arsenal - Manchester City' },
  { $set: { status: 'ratkennut', tulos: 'Tasapeli' } },
);

// Kaikki jotka EI veikanneet tasapeliä, häviävät
db.bets.updateMany(
  {
    tapahtuman_nimi: 'Valioliiga: Arsenal - Manchester City',
    valinta: { $ne: 'Tasapeli' },
  },
  { $set: { tila: 'häviö' } },
);

//Haetaan 3 suosituinta tapahtumaa tehtyjen vetojen lukumäärällä
db.bets.aggregate([
  {
    $group: {
      _id: '$tapahtuman_nimi',
      vetojen_maara: { $sum: 1 },
    },
  },
  {
    $sort: { vetojen_maara: -1 },
  },
  {
    $limit: 3,
  },
  {
    $project: {
      _id: 0,
      tapahtuma: '$_id',
      vetojen_maara: 1,
    },
  },
]);

// haetaan top 3 tapahtumaa veikkausten rahamäärän perusteella
db.bets.aggregate([
  {
    $group: {
      _id: '$tapahtuman_nimi',
      kokonaispanos: { $sum: '$panos' },
    },
  },
  {
    $sort: { kokonaispanos: -1 },
  },
  {
    $limit: 3,
  },
  {
    $project: {
      _id: 0,
      tapahtuma: '$_id',
      kokonaispanos: 1,
    },
  },
]);

// Näyttää kaikki tapahtumat joihin voi vielä tehdä vetoja
db.events
  .find(
    {
      status: 'avoin',
      alkamisaika: { $gt: new Date() },
    },
    {
      luoja: 0,
    },
  )
  .sort({ alkamisaika: 1 });
