export const filename = "./test/output/standards.sqlite";
export default {
    client: 'better-sqlite3',
    connection: { filename },
    useNullAsDefault: true,
    pool: {
        afterCreate: async function (conn: any, done: any) {
            ["journal_mode=WAL",
                "synchronous = off",
                "mmap_size = 30000000000",
                "page_size = 327680"].forEach(p => {
                    conn.pragma(p);
                });
            done();
        }
    }
}