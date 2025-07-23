'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_trainings', [
      {
        user_id: 1,
        training_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        training_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_trainings', null, {});
  }
};
