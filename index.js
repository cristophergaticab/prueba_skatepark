//Crear constantes de paquetes
const express = require("express");
const app = express();
const {engine} = require("express-handlebars");
const expressFileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const secretKey = "Shhhh";
//Constantes exportadas desde consultas.js
const {
    nuevoParticipante,
    getSkaters,
    getSkater,
    actualizarParticipante,
    eliminarParticipante,
    statusParticipantes,
} = require("./consultas");



// Crear servidor
app.listen(3000, () => console.log("Servidor disponible en http://localhost:3000"));

//Middlewares | Configuración de paquetes instalados
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Carpeta estática para css y guardado de imágenes
app.use(express.static(__dirname + "/public"));
//Configuración para subir imágenes
app.use(
    expressFileUpload({
        limits: 5000000,
        abortOnLimit: true,
        responseOnLimit: "El tamaño de la imagen supera el límite permitido, por favor vuelta a intentarlo",
    })
);

//Ruta para bootstrap
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        layoutsDir: `${__dirname}/views/mainLayout`,
    })
);
app.set("view engine", "handlebars");

// Renderizar rutas
//Ruta raíz
app.get("/", async (req, res) => {
    try {
        const skaters = await getSkaters()
        res.render("Home", { skaters });
    } catch (e) {
        res.status(500).send({
            error: `Algo salió mal... ${e}`,
            code: 500
        })
    };
});
//Registro participantes
app.get("/registro", (req, res) => {
    res.render("Registro");
});

app.get("/perfil", (req, res) => {
    const { token } = req.query
    jwt.verify(token, secretKey, (err, skater) => {
        if (err) {
            res.status(500).send({
                error: `Algo salió mal...`,
                message: err.message,
                code: 500
            })
        } else {
            res.render("Perfil", { skater });
        }
    })
});
//Ruta para logear
app.get("/login", (req, res) => {
    res.render("Login");
});

//Verificación de jtw en login
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const skater = await getSkater(email, password)
        const token = jwt.sign(skater, secretKey)
        res.status(200).send(token)
    } catch (e) {
        console.log(e)
        res.status(500).send({
            error: `Algo salió mal... ${e}`,
            code: 500
        })
    };
});

//Ruta para poder administrar los usuarios
app.get("/Admin", async (req, res) => {
    try {
        const skaters = await getSkaters();
        res.render("Admin", { skaters });
    } catch (e) {
        res.status(500).send({
            error: `Algo salió mal... ${e}`,
            code: 500
        })
    };
});

// API de Skaters

app.get("/skaters", async (req, res) => {

    try {
        const skaters = await getSkaters()
        res.status(200).send(skaters);
    } catch (e) {
        res.status(500).send({
            error: `Algo salió mal... ${e}`,
            code: 500
        })
    };
});

app.post("/skaters", async (req, res) => {
    const skater = req.body;
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send("No se encontro ningun archivo en la consulta");
    }
    const { files } = req
    const { foto } = files;
    const { name } = foto;
    const pathPhoto = `/uploads/${name}`
    foto.mv(`${__dirname}/public${pathPhoto}`, async (err) => {
        try {
            if (err) throw err
            skater.foto = pathPhoto
            await nuevoParticipante(skater);
            res.status(201).redirect("/login");
        } catch (e) {
            console.log(e)
            res.status(500).send({
                error: `Algo salió mal... ${e}`,
                code: 500
            })
        };

    });
})

//Actualizar participantes
app.put("/skaters", async (req, res) => {
    const skater = req.body;
    try {
        await actualizarParticipante(skater);
        res.status(200).send("Datos actualizados");
    } catch (e) {
        res.status(500).send({
            error: `Algo salió mal... ${e}`,
            code: 500
        })
    };
});

//Ruta para cambio de status participantes
app.put("/skaters/status/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        await statusParticipantes(id, estado);
        res.status(200).send("Estatus cambiado con éxito");
    } catch (e) {
        res.status(500).send({
            error: `Algo salió mal... ${e}`,
            code: 500
        })
    };
});

//Ruta para eliminar participantes
app.delete("/skaters/:id", async (req, res) => {
    const { id } = req.params
    try {
        await eliminarParticipante(id)
        res.status(200).send();
    } catch (e) {
        res.status(500).send({
            error: `Algo salió mal... ${e}`,
            code: 500
        })
    };
});
