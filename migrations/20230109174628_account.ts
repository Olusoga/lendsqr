import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('account', (table: Knex.TableBuilder) => {
        table.uuid('account_id').primary().defaultTo(knex.raw('(UUID())'));
        table.string('user_id').references('user_id').inTable('users');
        table.bigInteger('balance').notNullable().defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    await knex.schema.dropTable('account');
}
