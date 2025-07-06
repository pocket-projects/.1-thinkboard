import mongoose from "mongoose";
import Note from "../models/Note.js";

export const getAllNotes = async (_,res) => { // '_' is used as a placeholder for 'req' since it's not needed here
    try{
        const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort in desc. order (newest first)
        res.status(200).json(notes)

    } catch (error) {
        console.error("Error in getAllNotes controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
    
};

export const getNoteById = async (req,res) => {
    const noteId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({ message: "Invalid note ID" });
    }

    try {
        const note = await Note.findById(noteId);
        if(!note) return res.status(404).json({message: "Note not found!"});
            res.json(note); 
    } catch (error){
        console.error("Error in getNoteById controller",error);
        res.status(500).json({message:"Internal Server Error"});       
    }
};

export const createNote = async (req,res) => {
    try{
        const {title, content} = req.body // Get data from the request and create a new note
        const note = new Note({title, content}); 

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error){
        console.error("Error in createNote controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};



export const updateNote = async (req, res) => {
    const noteId = req.params.id;

    // Validate ID first
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({ message: "Invalid note ID" });
    }

    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { title, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found!" });
        }

        res.status(200).json({ message: "Note updated successfully!", updatedNote });
    } catch (error) {
        console.error("Error in updateNote controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteNote = async (req,res) => {
    const noteId = req.params.id;
    // Validate ID first
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({ message: "Invalid note ID" });
    }

    try {
        const deletedNote = await Note.findByIdAndDelete(noteId);

        if (!deletedNote) {
            return res.status(404).json({message: "Note not found!"});
        }

        res.status(200).json({message: "Noted deleted successfully!", deletedNote});
        
    } catch (error){
        console.error("Error in deleteNote controller:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};