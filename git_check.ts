import { execSync } from 'child_process';

try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    console.log("Git Status:\n", status || "Clean");
} catch (e: any) {
    console.error("Git error:", e.message);
}
