const BASE_URL = "https://carambar-backend-3k1g.onrender.com/";


/**
 * Récupère toutes les blagues
 * @returns {Promise<Array>} Liste des blagues
 */
export const getAllBlagues = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/blagues`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des blagues");
    return response.json();
};

/**
 * Récupère une blague aléatoire
 * @returns {Promise<Object>} Blague aléatoire
 */
export const getRandomBlague = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/blagues/random`);
    if (!response.ok) throw new Error("Erreur lors de la récupération d'une blague aléatoire");
    return response.json();
};

/**
 * Récupère une blague par son ID
 * @param {string|number} id - ID de la blague
 * @returns {Promise<Object>} Blague correspondante
 */
export const getBlagueById = async (id) => {
    const response = await fetch(`${BASE_URL}/api/v1/blagues/${id}`);
    if (!response.ok) throw new Error("Blague non trouvée");
    return response.json();
};

/**
 * Crée une nouvelle blague
 * @param {Object} blagueData - { question: string, reponse: string }
 * @returns {Promise<Object>} Blague créée
 */
export const createBlague = async (blagueData) => {
    const response = await fetch(`${BASE_URL}/api/v1/blagues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blagueData),
    });
    if (!response.ok) throw new Error("Erreur lors de la création de la blague");
    return response.json();
};
