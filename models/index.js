const AccountInfo = require('./user');
const MaxInfo = require('./maxInfo');
const Exercise = require('./exercise');

AccountInfo.hasOne(MaxInfo, {
    foreignKey: 'AccountInfo_id'
});

MaxInfo.belongsTo(AccountInfo, {
    foreignKey: 'AccountInfo_id'
});

MaxInfo.hasOne(Exercise, {
    foreignKey: 'max_id'
});

Exercise.belongsTo(MaxInfo, {
    foreignKey: 'max_id'
});


module.exports = {AccountInfo, MaxInfo, Exercise};