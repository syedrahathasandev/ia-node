
import { BadRequestError } from "http-errors-enhanced";
import { formatZodErrors } from "../utils/index.js";
import { signupSchema } from "../validators/auth.js";
import { db } from "../src/prisma/db.ts"
import bcrypt from "bcryptjs";
import { sendMail } from "../providers/mail.js";
import { generateEmailVerificationToken } from "../utils/jwt.js";
import { Config } from "../config/index.js";
async function signup(req, res, next) {
  const validationResult = signupSchema.safeParse(req.body);

  if (!validationResult.success) {
    return next(
      new BadRequestError({
        message: "Validation failed",
        properties: {
          errors: formatZodErrors(validationResult.error),
        },
      })
    );
  }

  const isUserExist = await db.orm.public.User.where({ email: validationResult.data.email }).first()
  if (isUserExist) {
    return next(
      new BadRequestError({
        message: "Email already exist",
      })
    );
  }
  const hashPassword = await bcrypt.hash(validationResult.data.password, 10);
  const createdUser = await db.orm.public.User.create({ ...validationResult.data, password: hashPassword })

  const { password, createdAt, updatedAt, ...user } = createdUser
  // Generate JWT
  const token = generateEmailVerificationToken(createdUser.id);
  // Verification URL
  const verificationUrl =
    `${Config.CLIENT_URL}/verify-email?token=${encodeURIComponent(token)}`;

  // Generate email HTML
  const html = verificationEmail(
    createdUser.name,
    verificationUrl
  );
  // Send email
  await sendMail(
    [createdUser.email],
    "Verify your email address",
    html
  );
  return res.status(201).json({
    success: true,
    message: "Signup successful. Please verify your email.",
    data: user,
  });
}

export { signup };
