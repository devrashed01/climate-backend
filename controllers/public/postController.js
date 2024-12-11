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

exports.detail = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    return res.status(404).json({
      message: "Post could not found!",
    });
  }

  res.json(post);
};
