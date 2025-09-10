import axios from "axios"
// let data = JSON.stringify({
//   "nomEntreprise": "TechCorp",
//   "anneeCreation": 2020,
//   "statutLegal": "SARL",
//   "secteurActivite": "Technologie",
//   "nombreEmployes": 50,
//   "localisation": "Brazzaville",
//   "telephone": "+242065000000",
//   "email": "contact@techcorp.com",
//   "chiffreAffaires": 1000000,
//   "beneficeNet": 250000,
//   "ratioDettes": 0.3,
//   "tresorerieDisponible": 150000,
//   "delaiPaiementClients": 30,
//   "delaiPaiementFournisseurs": 45,
//   "budgetRD": 50000,
//   "nbProduitsLances": 3,
//   "enregistrePertes": false,
//   "accesCredit": true,
//   "garantiesFinancieres": true,
//   "rapportFinancier": true,
//   "businessPlan": true,
//   "caClientPrincipal": 400000,
//   "crmOuErp": true,
//   "diversification": true,
//   "dependanceMarchesPublics": false,
//   "investissementDigital": true,
//   "manuelProcedures": true,
//   "nbEmploisCrees": 10,
//   "pourcentageFemmes": 40,
//   "actionsSociales": true,
//   "respectEnvironnement": true,
//   "certification": true,
//   "oddImpactes": "ODD 9, ODD 12",
//   "actionsEcologiques": "Recyclage, Réduction des déchets",
//   "dirigeantNom": "Jean Mabiala",
//   "experienceDirigeant": 10,
//   "formationDirigeant": true,
//   "equipeDirection": true,
//   "gouvernance": true,
//   "cartographieCompetences": "Leadership, Finance",
//   "planSuccession": true,
//   "formationContinue": true,
//   "tauxRotationPersonnel": 5,
//   "programmeBienEtre": true,
//   "defisActuels": "Accès au financement",
//   "objectifs12Mois": "Lancer deux nouveaux produits",
//   "autorisationDonnees": true,
//   "nomSignataire": "Jean Mabiala",
//   "dateSignature": "2025-08-05"
// });



export function createScoring(data:any) {
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://lementor-b-trust-pme-2.onrender.com/api/scoring',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
}



export async function getRapport() {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://lementor-b-trust-pme-2.onrender.com/api/scoring',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      data: {}
    };

    // 🔹 await pour récupérer la réponse
    const response = await axios.request(config);

    // 🔹 Boucle sur les éléments
    for (let index = 0; index < response.data.length; index++) {
      let element = response.data[index].data;
      // tu peux parser element si c'est une string JSON
      // ex : element = JSON.parse(element)
    }
    return response.data;

  } catch (error) {
    console.error(error);
    return null;
  }
}



