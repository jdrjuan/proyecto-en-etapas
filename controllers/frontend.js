import api from '../api/products.js';

const renderHome = async (req, res) => {
    try {
        let products = await api.getAllProducts();
        if (!Array.isArray(products)) {
            products = [];
        }
        // Asegura objetos planos (POJO) para Handlebars, especialmente si se usa Mongoose
        // y no se utilizó "lean()" para los documentos obtenidos.
        const plainProducts = products.map(p => {
            // Verifica si el producto existe y que tenga método toJSON 
            // (esto es común en Mongoose, pero no en objetos planos)
            // Si no es un objeto Mongoose, simplemente lo retorna como está.
            if (p && typeof p.toJSON === 'function') {
                return p.toJSON();
            }
            return p; // Ahora es un objeto plano (POJO), o null/undefined
        }).filter(p => p); // Filtra los items null/undefined que pueden venir del map().
                           // si bien el array original que los contiene api.getAllProducts
                           // no debería tener elementos null/undefined.

        res.render('home', { title: 'Inicio', products: plainProducts });
    } catch (error) {
        console.error("Error rendering home page:", error);
        res.status(500).render('home', { title: 'Inicio', products: [], error: 'No se pudo obtener el listado de productos.' });
    }
};

const renderAboutUs = (req, res) => {
    res.render('aboutUs', { title: 'Nosotros' });
};

const renderFaq = (req, res) => {
    res.render('faq', { title: 'Preguntas frecuentes' });
};

export default {
    renderHome,
    renderAboutUs,
    renderFaq
};
