module.exports = (sequelize, DataTypes) => {
    return sequelize.define('temperatures', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        temperature: {
            type: DataTypes.DOUBLE
        },
        humidity: {
            type: DataTypes.DOUBLE
        }
    })
}