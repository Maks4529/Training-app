'use strict';

const {hashSync} = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('users', [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'email1@gmail.com',
        password_hash: hashSync('12345678', Number(process.env.HASH_SALT)),
        birthday: '2000-09-10',
        role: 'user',
        image: '/static/images/defaultImage.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'John',
        last_name: 'Smith',
        email: 'email2@gmail.com',
        password_hash: hashSync('12345678', Number(process.env.HASH_SALT)),
        birthday: '2002-05-15',
        role: 'trainer',
        image: '/static/images/defaultImage.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
