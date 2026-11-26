export function ignoredFolders(setting = "") {
    return setting
        .split("\n")
        .map((line) =>
            line
                .trim()
                .replace(/\\/g, "/")
                .replace(/^\.\/|\/+$/g, "")
        )
        .filter(
            (folder) =>
                folder &&
                !folder
                    .split("/")
                    .some(
                        (part) => part === "." || part === ".." || part === ""
                    )
        );
}

export function visibleInSourceControl(setting?: string) {
    const folders = ignoredFolders(setting);
    return ({ vaultPath }: { vaultPath: string }) =>
        !folders.some(
            (folder) =>
                vaultPath.replace(/\\/g, "/") === folder ||
                vaultPath.replace(/\\/g, "/").startsWith(folder + "/")
        );
}
