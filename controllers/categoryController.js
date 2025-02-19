// controllers/categoryController.js
const Category = require('../models/Category');

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json({ msg: 'Category created successfully', category });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ msg: 'Category not found' });
        
        category.name = req.body.name || category.name;
        await category.save();
        res.json({ msg: 'Category updated successfully', category });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ msg: 'Category not found' });
        
        await Category.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };