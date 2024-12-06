const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SimpleValidator = require("../../validations/SimpleValidator");

exports.create = async (req, res) => {
  const { title, description, imageUrl, videoUrl } = req.body;

  SimpleValidator(req.body, {
    title: "required",
    description: "required",
    imageUrl: "required",
  });

  const post = await prisma.post.create({
    data: {
      title,
      description,
      imageUrl,
      videoUrl,
    },
  });

  res.json({
    status: "success",
    data: post,
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl, videoUrl } = req.body;

  SimpleValidator(req.body, {
    title: "required",
    description: "required",
    imageUrl: "required",
  });

  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      imageUrl,
      videoUrl,
    },
  });

  if (!post) {
    throw new AppError("Post could not found!", 404);
  }

  res.json({
    status: "success",
    data: post,
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  await prisma.post.delete({
    where: {
      id: id,
    },
  });

  res.json({
    status: "success",
    message: "Post removed successfully",
  });
};

exports.list = async (req, res) => {
  const posts = await prisma.post.findMany();

  res.json({
    status: "success",
    data: posts,
  });
};
