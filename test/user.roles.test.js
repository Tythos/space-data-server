const Knex = require("knex");
const fs = require("fs");

fs.rmSync("./test.sqlite", { force: true, recursive: true });


// Create a Knex connection
const knex = Knex({
    "client": "better-sqlite3",
    "connection": {
        "filename": "./test.sqlite"
    },
    "useNullAsDefault": true,
    "version": "0.0.2+1668785618858"
});

// Define the users table with a foreign key to the roles table
let tSchema = knex.schema;
// Define the child table
tSchema.createTableIfNotExists('children', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('parent_id');
    table.foreign('parent_id').references('id').inTable('parents').onDelete('cascade');

})
    .then(async () => {
        console.log('Children table created');
        // Define the parent table with references to two child table rows and cascading delete
        await tSchema.createTable('parents', table => {
            table.integer('id').primary();
            table.string('name').notNullable();
            table.integer('child1_id').unsigned().notNullable();
            table.integer('child2_id').unsigned().notNullable();
        });

        // Insert a row into the parent table with references to the two child table rows
        knex('parents')
            .insert([
                { id: 1, name: 'Parent', child1_id: 1, child2_id: 2 },
                { id: 2, name: 'Parent', child1_id: 4, child2_id: 3 }])
            .then(async () => {
                console.log('Row inserted into parent table');
                // Insert a row into the child table
                await knex('children')
                    .insert([
                        { name: 'Child 1', id: 1, parent_id: 1 },
                        { name: 'Child 2', id: 2, parent_id: 1 },
                        { name: 'Child 3', id: 3, parent_id: 2 }])
                console.log('Row inserted into children table');
                console.log(await knex("children"));
                // Delete a row from the parent table
                await knex('parents')
                    .where('id', 1)
                    .del()
                console.log('Row deleted from parents table');
                console.log("parents", await knex('parents'))

                // Query the children table to see that the rows were deleted
                console.log("children", await knex('children'));

            })
            .catch(error => {
                console.log(error);
            });




    })
    .catch(error => {
        console.log(error);
    });




