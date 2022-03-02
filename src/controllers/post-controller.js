import { prisma } from "../helpers/utils.js";

export const index = async (req, res) => {
  const { id } = req.query;
  const { take, skip, page } = req.pagination;

  if (id) {
    try {
      const postsCount = await prisma.post.count({
        where: {
          authorId: Number(id),
        },
      });
      let posts = await prisma.post.findMany({
        take,
        skip,
        where: {
          authorId: Number(id),
        },
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
      return res.send({
        posts,
        pagination: { page, pageCount: Math.ceil(postsCount / take) },
      });
    } catch (error) {
      console.error("users", error);
      res.status(404).send({ error: `Cannot fetch posts` });
    }
  } else {
    try {
      const postsCount = await prisma.post.count();
      let posts = await prisma.post.findMany({
        take,
        skip,
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
      return res.send({
        posts,
        pagination: { page, pageCount: Math.ceil(postsCount / take) },
      });
    } catch (error) {
      console.error("posts", error);
      res.status(500).send({ error: `Cannot fetch posts` });
    }
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
