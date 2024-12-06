const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  res.json(posts);
};
