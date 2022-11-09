'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      password: '123456',
      firstName: 'Kuro',
      lastName: 'Hiyuki',
      email: 'admin@example.com',
      gender: 1,
      roleId: 'R1',
      phone: "0798222837",
      positionId: 'Doctor',
      image: './image/pn1.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
