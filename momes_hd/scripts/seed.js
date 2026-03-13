require("dotenv").config()
const { sequelize, Post, Category } = require("../src/models")

const posts = [
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Mi+codigo+funciona+y+no+se+por+que",
        description: "El miedo más profundo de un programador."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Yo+intentando+ser+adulto+funcional",
        description: "Alguien que me explique cómo se paga la luz."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Cerrando+150+pestañas+despues+de+terminar+la+tarea",
        description: "La verdadera libertad se siente así."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=El+gym+esta+caro+mejor+hago+ejercicio+mental",
        description: "Sobrepensar también quema calorías, ¿no?"
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=POV:+Ves+tu+cuenta+bancaria+despues+del+finde",
        description: "Un minuto de silencio por mis ahorros."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Existo+porque+los+memes+son+gratis",
        description: "Mi único motor de vida ahora mismo."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=No+estoy+cansado+estoy+en+modo+ahorro+de+energia",
        description: "Batería baja desde 1995."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Mi+dieta+empieza+el+lunes+(de+2030)",
        description: "Compromiso ante todo."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Internet+se+cae+5+minutos:+*Panico+social*",
        description: "Tuve que hablar con mi familia, parecen buena gente."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Yo+explicandole+a+mi+gato+mis+problemas",
        description: "Es el único que no me juzga (creo)."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Expectativa:+Productivo+/+Realidad:+Netflix",
        description: "La procrastinación es mi deporte favorito."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=¿Dormir?+¿Que+es+ese+DLC?",
        description: "Mi cuerpo pide café, mi alma pide vacaciones."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Google+es+mi+segundo+cerebro",
        description: "Sin Google no sé ni cómo se escribe 'hola'."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Cuando+el+GPS+dice+recalculando+y+tu+ya+te+perdiste",
        description: "Es el fin, aquí viviré ahora."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=El+cafe+no+hace+efecto+necesito+un+exorcismo",
        description: "Lunes por la mañana vibe."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Mi+paciencia+es+como+un+plan+de+datos+limitado",
        description: "Y ya me quedan pocos megas."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Revisando+el+celular+cada+2+segundos+sin+notificaciones",
        description: "Optimismo nivel Dios."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=1+error+en+la+linea+10...+borro+todo+el+proyecto",
        description: "Soluciones drásticas para problemas drásticos."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=Yo+viendo+como+ignoran+mi+mensaje+en+visto",
        description: "No duele, quema."
    },
    {
        image_url: "https://dummyimage.com/600x400/000/fff&text=¿Café+o+Tila?+Depende+del+cliente",
        description: "Manual de supervivencia profesional."
    }
];

const categories = [
    { id: 1, name: "💻 Código y Café" },
    { id: 2, name: "💸 Vida Adulta" },
    { id: 3, name: "🧠 Salud Mental (o falta de ella)" },
    { id: 4, name: "🍕 Procrastinación" },
    { id: 5, name: "🐈 Random & Gatos" }
];

const post_category = [
    { postId: 1, categoryId: 1 },
    { postId: 2, categoryId: 2 },
    { postId: 3, categoryId: 4 },
    { postId: 4, categoryId: 3 },
    { postId: 5, categoryId: 2 },
    { postId: 6, categoryId: 5 },
    { postId: 7, categoryId: 3 },
    { postId: 8, categoryId: 4 },
    { postId: 9, categoryId: 5 },
    { postId: 10, categoryId: 5 },
    { postId: 11, categoryId: 4 },
    { postId: 12, categoryId: 3 },
    { postId: 12, categoryId: 1 },
    { postId: 13, categoryId: 1 },
    { postId: 14, categoryId: 2 },
    { postId: 15, categoryId: 1 },
    { postId: 15, categoryId: 3 },
    { postId: 16, categoryId: 3 },
    { postId: 17, categoryId: 5 },
    { postId: 18, categoryId: 1 },
    { postId: 19, categoryId: 5 },
    { postId: 20, categoryId: 1 },
    { postId: 20, categoryId: 2 }
];

const createData = async () => {
    await sequelize.sync({ force: true })

    await Post.bulkCreate(posts)
    await Category.bulkCreate(categories)

    const postCategory = sequelize.models.post_category
    await postCategory.bulkCreate(post_category)
    console.log("Datos insertados correctamente");
    return;
}

createData()