const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get comments for a post
router.get('/post/:postId', authenticateToken, async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(req.params.postId) },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Create comment
router.post('/post/:postId', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(req.params.postId),
        authorId: req.user.userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create comment' });
  }
});

// Delete comment
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.authorId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await prisma.comment.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete comment' });
  }
});

module.exports = router;