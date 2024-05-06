
const express = require('express');
const {
  createNote,
  getNotes,
  changeNote,
  deleteNote,
  searchNotes
} = require('../servis/Notesrvs');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { userId } = req.user;
    const response = await getNotes(userId);
    res.status(response.status).send(response.result);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const { userId } = req.user;
  const { title, text } = req.body;
  if (!title || !text) res.sendStatus(400);

  try {
    const response = await createNote({ title, text, createdBy: userId });
    res.status(response.status).send(response.result);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put('/', async (req, res) => {
  const { userId } = req.user;
  const { id } = req.query;
  const { title, text } = req.body;

  const filter = { _id: id, createdBy: userId };
  const update = {};
  if (title) update.title = title;
  if (text) update.text = text;

  if (!title && !text) res.sendStatus(400);

  try {
    const response = await changeNote(update, filter);
    res.status(response.status).send(response.result);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete('/', async (req, res) => {
  const { userId } = req.user;
  const { id } = req.query;
  const filter = { _id: id, createdBy: userId };

  try {
    const response = await deleteNote(filter);
    res.sendStatus(response);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/search', async (req, res) => {
  const { userId } = req.user;
  const { title } = req.query;
  const filter = { title: title, createdBy: userId };

  try {
    const response = await searchNotes(filter);
    res.status(response.status).send(response.result);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
