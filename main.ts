// Get the most reposts and likes on make.fun's newest X posts — make.fun entry
// The entry is the list of the entrant's own X posts in POSTS.json: three
// quotes of @makefunai's newest posts, all from @pijantung51112, each carrying
// make.fun and the play code makefun-ribbon-loaf-solar in its own words.
// This program does one thing: it copies POSTS.json from the repository
// (MAKEFUN_BOT_DIR, default /bot) to /output (MAKEFUN_OUTPUT_DIR, default
// /output). The house reads the posts themselves from X and scores them.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The list must hold 1 to 15 of the entrant's own posts, in {"posts": [...]} form.
const listed = JSON.parse(readFileSync(join(botDir, "POSTS.json"), "utf8"));
if (!Array.isArray(listed.posts) || listed.posts.length < 1 || listed.posts.length > 15) {
  throw new Error(`POSTS.json must list 1 to 15 posts, found ${listed.posts?.length}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(join(botDir, "POSTS.json"), join(outDir, "POSTS.json"));
