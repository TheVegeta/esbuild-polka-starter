import fs from "fs-extra";

const genFolder = async () => {
  await fs.ensureDir("uploads");
};

genFolder();
