'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('trainings', [
      {
        title: 'Strength & Endurance Basics',
        description: 'Learn the fundamentals of building strength and boosting your stamina through effective full-body workouts.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Mindful Mobility Flow',
        description: 'A guided training focused on improving flexibility, balance, and mental focus using low-impact movement and breath control.',
        created_at: new Date(),
        updated_at: new Date(),
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('trainings', null, {});
  }
};
