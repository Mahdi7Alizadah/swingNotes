const Note = require('../model/NoteMdl');
const validLength = require('../middlewer/NoteMdlwr');

const getNotes = async (userId) => {
  try {
    const query = { createdBy: userId };
    return { status: 200, result: await Note.find(query).sort({ updatedAt: -1 }) };
  } catch (error) {
    return { status: 404, result: 'No data found' };
  }
};

const createNote = async (newNote) => {
  try {
    if (!validLength(newNote))
      return {
        status: 400,
        result: { error: 'Note does not meet expectation.' },
      };

    return { status: 201, result: await Note.insert(newNote) };
  } catch (error) {
    throw error;
  }
};

const changeNote = async (newNote, filter) => {
  try {
    if (!validLength(newNote))
      return {
        status: 400,
        result: { error: 'Note does not meet expectation.' },
      };
    const updatedNote = await Note.update(filter, { $set: newNote }, {});
    if (!updatedNote)
      return {
        status: 404,
        result: { error: 'No note found matching UserID and ID.' },
      };
    return { status: 200, result: updatedNote };
  } catch (error) {
    throw error;
  }
};

const deleteNote = async (filter) => {
  try {
    const idRemoved = await Note.remove(filter);
    if (idRemoved === 1) {
      return 204;
    } else {
      return 404;
    }
  } catch (error) {
    throw error;
  }
};

const searchNotes = async (filter) => {
  try {
    const result = await Note.find({
      title: { $regex: filter.title, $options: 'i' },
      createdBy: filter.createdBy,
    });

    if (result.length < 1)
      return { status: 404, result: { result: 'No notes found' } };

    return { status: 200, result: result };
  } catch (error) {
    throw error;
  }
};

module.exports = { getNotes, createNote, changeNote, deleteNote, searchNotes };
