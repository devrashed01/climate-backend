const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SimpleValidator = require("../../validations/SimpleValidator");
const AppError = require("../../exception/AppError");

exports.details = async (req, res) => {
  const data = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!data) {
    throw new AppError("User could not found!", 404);
  }

  return res.json({ data });
};
