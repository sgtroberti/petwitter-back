import { prisma } from "../helpers/utils.js";

export const index = async (req, res) => {
  let { user } = req.query;

  if (user === "self") {
    user = req.user.username;
  }

  if (user) {
    try {
      let foundUser = await prisma.user.findUnique({
        where: {
          username: user,
        },
        include: { profile: true },
      });
      return res.send({ foundUser });
    } catch (error) {
      console.error("users", error);
      res.status(404).send({ error: `User ${user} don't exists` });
    }
  } else {
    try {
      let users = await prisma.user.findMany({
        include: { profile: true },
      });
      return res.send({ data: { users } });
    } catch (error) {
      console.error("users", error);
      res.status(500).send({ error: `Cannot fetch users` });
    }
  }
};
