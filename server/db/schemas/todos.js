import mongoose from "mongoose";

// Un schema explique le format des documents d'une collection.
const TodosSchema = mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },

    todos: [
        {
            titre: { type: String, required: true },
            isFinish: { type: Boolean, required: true, default: false }
        }
    ]
});

// Le model permet l'interaction avec la collection
export const TodosModel = mongoose.model('Todos', TodosSchema);

