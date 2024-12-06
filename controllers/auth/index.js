const { PrismaClient } = require("@prisma/client");
const generateToken = require("../../utils/generateToken");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const SimpleValidator = require("../../validations/SimpleValidator");
const AppError = require("../../exception/AppError");

exports.create = async (req, res) => {
  SimpleValidator(req.body, {
    name: "required|min:3",
    password: "required|min:3",
    email: "required|email",
  });

  const { name, password, email } = req.body;

  // check if user exists
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user)
    return res
      .status(400)
      .json({ errors: [{ message: "User already exists" }] });

  // hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // create new user
  user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
  });

  const token = generateToken(user);
  res.json({ token, message: "User created successfully" });
};

exports.login = async (req, res) => {
  SimpleValidator(req.body, {
    email: "required|email",
    password: "required|min:3",
  });

  // destructure request body
  const { email, password } = req.body;

  // check if user exists
  let user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token, message: "Login successful" });
};

exports.changePassword = async (req, res) => {
  SimpleValidator(req.body, {
    old_password: "required|string|min:6",
    new_password: "required|string|min:6",
    confirm_password: "required|string|min:6",
  });

  const { old_password, new_password, confirm_password } = req.body;

  if (new_password !== confirm_password) {
    throw new AppError("Password does not match!", 422);
  }

  const doc = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!doc) {
    throw new AppError("User could not found!", 422);
  }

  // check if password matches
  const isMatch = await bcrypt.compare(old_password, doc.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 422);
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(new_password, salt);

  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      password: passwordHash,
    },
  });

  return res.json({
    status: "success",
    message: "Password updated successfully",
  });
};
