import mongoose
from "mongoose";

const activityLogSchema =
  mongoose.Schema(
    {
      action: {
        type: String,
        required: true
      },

      performedBy: {
        type: String,
        required: true
      },

      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  );

const ActivityLog =
  mongoose.model(
    "ActivityLog",
    activityLogSchema
  );

export default
ActivityLog;