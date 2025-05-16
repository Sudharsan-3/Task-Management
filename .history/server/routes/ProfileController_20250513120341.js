
// // 🧑‍💼 Profile Controller (Assumes auth middleware sets `req.user`)
// export const profileController = async (req, res) => {
//     try {
//       const user = req.user; // req.user should be set by a verifyToken middleware
//       res.send(`Welcome to the profile, ${user.name}`);
//     } catch (error) {
//       res.status(500).send("Failed to load profile");
//     }
//   };