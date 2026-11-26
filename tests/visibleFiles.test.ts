import { expect, it } from "vitest";
import { visibleInSourceControl } from "../src/ignoredFolders";

it("filters vault-relative folder boundaries without hiding similarly named paths", () => {
    const files = [
        ".obsidian/plugins/git/data.json",
        ".obsidian-backup/app.json",
        "notes/.obsidian/file",
        "private/drafts/note.md",
    ].map((vaultPath) => ({ vaultPath }));
    expect(
        files.filter(
            visibleInSourceControl(" .obsidian/ \r\n./private\\drafts/\n")
        )
    ).toEqual([files[1], files[2]]);
    expect(files.filter(visibleInSourceControl(""))).toEqual(files);
});
