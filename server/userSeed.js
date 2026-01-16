import User from "./models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectToDatabase from "./db/db.js";

const userSeed = async () => {
  await connectToDatabase();
  try {
    // const existingAdmin = await User.findOne({ role: "admin" });
    // if (existingAdmin) {
    //   console.log("Admin user already exists. Skipping seeding.");
    //   return;
    // }
    const hashedPassword = await bcrypt.hash("admin", 10);
    const adminUser = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });
    await adminUser.save();
    console.log("Admin user created successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

userSeed();
