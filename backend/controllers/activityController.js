import ActivityLog
from "../models/ActivityLog.js";

export const getLogs =
  async (req, res) => {

    try {

      const logs =
        await ActivityLog.find()
          .sort({
            createdAt:
              -1
          });

      res.json(logs);

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });
    }
};