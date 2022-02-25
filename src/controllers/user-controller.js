import { prisma } from "../helpers/utils.js";

export const index = async (req, res) => {
  try {
    let users = await prisma.user.findMany({
      include: { profile: true },
    });
    return res.send({ data: { users } });
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Cannot fetch users` });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        name,
        profile: {
          create: {},
        },
      },
    });
    return res.send(newUser);
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Cannot create user` });
  }
};
