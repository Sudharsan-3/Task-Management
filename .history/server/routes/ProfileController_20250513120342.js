// 🧑‍💼 Profile Controller (Assumes auth middleware sets `req.user`)
export const profileController = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: No user data found",
      });
    }

    return res.status(200).json({
      message: `Welcome to the profile, ${user.name}`,
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({
      message: "Failed to load profile",
      error: error.message,
    });
  }
};

// // 🧑‍💼 Profile Controller (Assumes auth middleware sets `req.user`)
// export const profileController = async (req, res) => {
//     try {
//       const user = req.user; // req.user should be set by a verifyToken middleware
//       res.send(`Welcome to the profile, ${user.name}`);
//     } catch (error) {
//       res.status(500).send("Failed to load profile");
//     }
//   };