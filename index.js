// Configuration de l'API - Modifiez cette URL après déploiement
const API_BASE_URL = 'https://votre-api-render.onrender.com/api/v1';
// Pour les tests en local : 'http://localhost:3000/api/v1'

// Éléments du DOM
const blagueContainer = document.querySelector('.blague-content');
const loadingElement = document.querySelector('.loading');
const errorElement = document.getElementById('error-message');
const boutonBlague = document.querySelector('.btn-blague');

// Fonction pour afficher une blague
function afficherBlague(blague) {
    blagueContainer.innerHTML = `
                <div class="question">${blague.question}</div>
                <div class="reponse">${blague.reponse}</div>
            `;
}

// Fonction pour afficher les erreurs
function afficherErreur(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

// Fonction pour afficher le loading
function toggleLoading(show) {
    loadingElement.style.display = show ? 'block' : 'none';
    boutonBlague.disabled = show;
    if (show) {
        boutonBlague.style.opacity = '0.6';
    } else {
        boutonBlague.style.opacity = '1';
    }
}

// Fonction principale pour récupérer une blague aléatoire
async function getBlagueAleatoire() {
    try {
        toggleLoading(true);
        errorElement.style.display = 'none';

        const response = await fetch(`${API_BASE_URL}/blagues/random`);

        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
            afficherBlague(data.data);
        } else {
            throw new Error('Format de réponse invalide');
        }

    } catch (error) {
        console.error('Erreur lors de la récupération de la blague:', error);

        // Messages d'erreur personnalisés
        let messageErreur = 'Oups ! Impossible de récupérer une blague pour le moment.';

        if (error.message.includes('Failed to fetch')) {
            messageErreur = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
        } else if (error.message.includes('404')) {
            messageErreur = 'Aucune blague disponible pour le moment.';
        } else if (error.message.includes('500')) {
            messageErreur = 'Erreur du serveur. Réessayez dans quelques instants.';
        }

        afficherErreur(messageErreur);

        // Affichage d'une blague de secours
        afficherBlague({
            question: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?",
            reponse: "Parce que sinon, ils tombent dans le bateau ! 😄"
        });

    } finally {
        toggleLoading(false);
    }
}

// Fonction pour tester la connexion à l'API
async function testerAPI() {
    try {
        console.log('Test de connexion à l\'API...');
        const response = await fetch(`${API_BASE_URL}/blagues`);

        if (response.ok) {
            console.log('✅ Connexion à l\'API réussie !');
            const data = await response.json();
            console.log(`📊 ${data.count} blagues disponibles`);
        } else {
            console.warn('⚠️ API non disponible, mode hors ligne activé');
        }
    } catch (error) {
        console.warn('⚠️ Impossible de se connecter à l\'API:', error.message);
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍬 Bienvenue chez Carambar & Co !');
    testerAPI();

    // Ajouter un raccourci clavier
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && !boutonBlague.disabled) {
            event.preventDefault();
            getBlagueAleatoire();
        }
    });
});

// Gestion des erreurs globales
window.addEventListener('error', function(event) {
    console.error('Erreur JavaScript:', event.error);
});