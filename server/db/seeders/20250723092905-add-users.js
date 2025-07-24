'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('users', [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'email1@gmail.com',
        password_hash: '12345',
        birthday: '2000-09-10',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'John',
        last_name: 'Smith',
        email: 'email2@gmail.com',
        password_hash: '67890',
        birthday: '2002-05-15',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
