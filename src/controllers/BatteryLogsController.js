const { BatteryLogs, Drones } = require('../models');

const BatteryLogsController = {
    getAllBatteryLogs: async () => {
        try {
            return await BatteryLogs.findAll({
                include: {
                    model: Drones,
                    as: 'drone',
                }
            });
        } catch (error) {
            throw new Error('Error fetching battery logs.');
        }
    },

    getBatteryLogsForDrone: async (droneId) => {
        try {
            const drone = await Drones.findOne({
                where: {
                    id: droneId,
                    flagDelete: false,
                },
            });
            if (!drone) {
                throw new Error('Drone not found.');
            }

            return await BatteryLogs.findAll({
                where: { droneId },
                include: {
                    model: Drones,
                    as: 'drone',
                }
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deleteBatteryLogsForDrone: async (droneId) => {
        try {
            const drone = await Drones.findOne({
                where: {
                    id: droneId,
                    flagDelete: false,
                },
            });
            if (!drone) {
                throw new Error('Drone not found.');
            }

            await BatteryLogs.destroy({
                where: { droneId },
            });

            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

module.exports = BatteryLogsController;