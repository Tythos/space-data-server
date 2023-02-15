export async function runPragmas(knexConnection: any) {
    ["pragma journal_mode = WAL;",
        "pragma synchronous = normal;",
        "pragma temp_store = memory;",
        "pragma mmap_size = 30000000000;"].map(async (pragma: string) => {
            await knexConnection.raw(pragma);
        });
}