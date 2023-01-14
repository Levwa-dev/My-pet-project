'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
    });

    await queryInterface.createTable('token', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING(500)
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'user',
          key:'id',
          as: 'userId'
        }
      },
    });

    await queryInterface.createTable('videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      video: {
        type: Sequelize.STRING(500)
      }
    });

    await queryInterface.createTable('call_back', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      patronymic: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      call: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    });
    
    await queryInterface.createTable('category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    });

    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      picture: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      bestOffer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      oldPrice : {
        type: Sequelize.FLOAT
      },
      price: {
        type: Sequelize.FLOAT
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      sale: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      avaliable:{
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'category',
          key:'id',
          as: 'categoryId'
        }
      }
    });

    await queryInterface.createTable('product_picture', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      picture: {
        type: Sequelize.STRING
      },
      productId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'product',
          key: 'id',
          as: 'productId'
        }
      }
    });

    await queryInterface.createTable('order_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      patronymic: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      building: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.INTEGER
      },
      payment: {
        type: Sequelize.STRING
      },
      orderNumber: {
        type: Sequelize.STRING
      },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('order_product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      orderInfoId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'order_info',
          key: 'id',
          as: 'orderInfoId'
        }
      }

    });

    await queryInterface.createTable('in_box', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      boxName: {
        type: Sequelize.STRING
      },
      boxId: {
        type: Sequelize.INTEGER
      },
      productName: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.INTEGER
      },
      orderInfoId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'order_info',
          key: 'id',
          as: 'orderInfoId'
        }
      }

    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};
