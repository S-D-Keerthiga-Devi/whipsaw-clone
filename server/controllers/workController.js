import Work from '../models/Work.js';

// Get all work items
export const getAllWork = async (req, res) => {
  try {
    const works = await Work.find().sort({ date: -1 });
    res.json(works);
  } catch (err) {
    console.error('Error fetching work items:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single work item by ID
export const getWorkById = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    
    if (!work) {
      return res.status(404).json({ message: 'Work item not found' });
    }
    
    res.json(work);
  } catch (err) {
    console.error('Error fetching work item:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new work item
export const createWork = async (req, res) => {
  try {
    const { title, category, image, client, year, description, content, author } = req.body;
    
    // Validate required fields
    if (!title || !category || !client || !year || !description || !content || !author) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    const newWork = new Work({
      title,
      category,
      image,
      client,
      year,
      description,
      content,
      author,
      date: new Date()
    });
    
    const savedWork = await newWork.save();
    res.status(201).json(savedWork);
  } catch (err) {
    console.error('Error creating work item:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a work item
export const updateWork = async (req, res) => {
  try {
    const { title, category, image, client, year, description, content, author } = req.body;
    
    // Find and update the work item
    const updatedWork = await Work.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        image,
        client,
        year,
        description,
        content,
        author
      },
      { new: true }
    );
    
    if (!updatedWork) {
      return res.status(404).json({ message: 'Work item not found' });
    }
    
    res.json(updatedWork);
  } catch (err) {
    console.error('Error updating work item:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a work item
export const deleteWork = async (req, res) => {
  try {
    const deletedWork = await Work.findByIdAndDelete(req.params.id);
    
    if (!deletedWork) {
      return res.status(404).json({ message: 'Work item not found' });
    }
    
    res.json({ message: 'Work item deleted successfully' });
  } catch (err) {
    console.error('Error deleting work item:', err);
    res.status(500).json({ message: 'Server error' });
  }
};