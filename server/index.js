// Importer les fonctions de express
import express from "express";
import cors from "cors";
// Importer les fonctions de mongoose
import mongoose from "mongoose";
import {
    createTodo,
    mettreAjourTodos,
    recupererToutesTodos,
    supprimerTodos
} from "./db/repository/todos-repository.js";

// Nom de la base de données
const DB_NAME = "todos";
// URI/URL de la base de données
const MONGO_URI = "mongodb+srv://app:app@djemai-samy.pblfgsb.mongodb.net/" + DB_NAME;

// Créer une application serveur
const app = express();
app.use(express.json())
app.use(cors());
// Ajouter une route au serveur qui accepte les requetes sur l'url "/" avec la méthode GET
app.get('/ping', (requete, reponse) => {
    // Envoyer une reponse de type texte au client
    reponse.end('<h1>Pong</h1>');
});

// Route GET pour récuperer les todos
app.get('/todos', async (requete, reponse) => {

    // Fonction du repository pour récuperer toutes les todos
    const listeDesTaches = await recupererToutesTodos();
    reponse.json({ todos: listeDesTaches })
})

// Route POST pour créer les todos
app.post('/todos', async (requete, reponse) => {
    // récuperer les données envoyé par l'utilisateur
    const data = requete.body;
    // Utiliser notre fonction pour créer la todo
    const createdTodo = await createTodo(data);
    // Retouner dans la réponse la todo créer en JSON
    reponse.json({ todo: createdTodo })
})

// Route PUT pour mettre a jout une todolist
app.put('/todos/:id', async (requete, reponse) => {
    // Récuperer l'id des paramètres d'URL
    const id = requete.params.id;

    // Récuperer le titre et la description du corps de la requete
    const titre = requete.body.titre;
    const description = requete.body.description;

    // Utiliser notre fonction pour mettre a jour la todo
    const todoMisAjour = await mettreAjourTodos(
        id,
        { titre, description }
    );

    // Retourner une reponse avec la todo mis a jour
    reponse.json({ updatedTodo: todoMisAjour });

})

app.delete('/todos/:id', async (requete, reponse) => {
    const id = requete.params.id;
    await supprimerTodos(id)
    reponse.json({ message: "Todos Supprimée !" })
})

// Lancer l'aplication^sur le port 3001
app.listen(3001, function () {
    console.log('Serveur lancé sur le port 3001!');

    // Se connecter a la BDD
    mongoose.connect(MONGO_URI).then(() => {
        console.log("BDD connecté");
    }).catch(() => {
        console.log("Pas connecté");
    })
})
