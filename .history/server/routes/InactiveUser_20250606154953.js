import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ Renamed to "InactiveUser" for proper spelling
export const InactiveUser = async (req, res) => {
  const { id, mode } = req.body;

  // Validate input
  const userId = parseInt(id);
  if (isNaN(userId) || !["active", "inactive"].includes(mode)) {
    return res.status(400).json({ error: "Invalid user ID or mode. Mode must be 'active' or 'inactive'." });
  }

  try {
    // Update the user mode
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { mode },
    });

    console.log("User mode updated:", updatedUser);

    return res.status(200).json({
      message: "User mode updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update failed:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(500).json({
      error: "Something went wrong while updating the user mode",
      details: error.message,
    });
  }
};
