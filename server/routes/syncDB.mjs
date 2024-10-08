import express from "express";
import { exec } from "child_process";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// MongoDB URIs and paths
const SERVER_MONGODB_URI = process.env.SERVER_MONGODB_URI;
const DEV_MONGODB_URI = process.env.DEV_MONGODB_URI;
const DUMP_PATH = path.join("/tmp", "mongo_dump");

// Helper function to execute shell commands
const runShellCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else {
        resolve(stdout);
      }
    });
  });
};

// API to sync MongoDB databases
router.get("/sync", async (req, res) => {
  try {
    // Step 1: Dump data from MongoDB Atlas
    const dumpCommand = `mongodump --uri "${SERVER_MONGODB_URI}" --out "${DUMP_PATH}"`;
    console.log("Running mongodump...");
    await runShellCommand(dumpCommand);
    console.log("MongoDB dump successful");

    // Step 2: Restore dump to local MongoDB
    const restoreCommand = `mongorestore --uri "${DEV_MONGODB_URI}" --drop "${DUMP_PATH}/exim"`;
    console.log("Running mongorestore...");
    await runShellCommand(restoreCommand);
    console.log("MongoDB restore successful");

    // Step 3: Cleanup dump files
    const cleanupCommand = `rm -rf "${DUMP_PATH}"`;
    await runShellCommand(cleanupCommand);
    console.log("Cleanup successful");

    res.send("MongoDB sync successful");
  } catch (error) {
    console.error("Error during sync:", error.stderr);
    res.status(500).send("MongoDB sync failed");
  }
});

export default router;
