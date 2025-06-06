import api from '../api/products.js';

const renderHome = async (req, res) => {
    // Definir menuLinks para el Navbar, marcando 'Inicio' como activo
    const menuLinks = [
        { url: '/', text: 'Inicio', isActive: req.path === '/' },
        { url: '/nosotros', text: 'Nosotros', isActive: req.path === '/nosotros' },
        { url: '/preguntas-frecuentes', text: 'Preguntas Frecuentes', isActive: req.path === '/preguntas-frecuentes' }
    ];

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

        res.render('home', { 
            title: 'Inicio', 
            products: plainProducts,
            menuLinks: menuLinks // Pasar menuLinks a la vista
        });
    } catch (error) {
        console.error("Error rendering home page:", error);
        res.status(500).render('home', { 
            title: 'Inicio', 
            products: [], 
            error: 'No se pudo obtener el listado de productos.',
            menuLinks: menuLinks // Pasar menuLinks a la vista
        });
    }
};

const renderAboutUs = (req, res) => {
    // Definir menuLinks para el Navbar, marcando 'Nosotros' como activo
    const menuLinks = [
        { url: '/', text: 'Inicio', isActive: req.path === '/' },
        { url: '/nosotros', text: 'Nosotros', isActive: req.path === '/nosotros' },
        { url: '/preguntas-frecuentes', text: 'Preguntas Frecuentes', isActive: req.path === '/preguntas-frecuentes' }
    ];
    res.render('aboutUs', { 
        title: 'Nosotros',
        menuLinks: menuLinks // Pasar menuLinks a la vista
    });
};

const renderFaq = (req, res) => {
    // Definir menuLinks para el Navbar, marcando 'Preguntas Frecuentes' como activo
    const menuLinks = [
        { url: '/', text: 'Inicio', isActive: req.path === '/' },
        { url: '/nosotros', text: 'Nosotros', isActive: req.path === '/nosotros' },
        { url: '/preguntas-frecuentes', text: 'Preguntas Frecuentes', isActive: req.path === '/preguntas-frecuentes' }
    ];
    res.render('faq', { 
        title: 'Preguntas frecuentes',
        menuLinks: menuLinks // Pasar menuLinks a la vista
    });
};

export default {
    renderHome,
    renderAboutUs,
    renderFaq
};
