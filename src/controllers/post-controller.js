import { prisma } from "../helpers/utils.js";
import { format, render, cancel, register } from "timeago.js";

export const index = async (req, res) => {
  try {
    let posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            username: true,
            profile: {
              select: { avatar_url: true },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return res.send(posts);
  } catch (error) {
    console.error("posts", error);
    res.status(500).send({ error: `Cannot fetch posts` });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const authorId = +req.user.id;
    console.log(authorId);
    const newPost = await prisma.post.create({
      data: { content, authorId },
    });
    return res.send(newPost);
  } catch (error) {
    console.error("posts", error);
    res.status(500).send({ error: `Cannot add posts` });
  }
};
