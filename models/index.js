const AccountInfo = require('./user');
const MaxInfo = require('./maxInfo');
const Exercise = require('./exercise');

AccountInfo.hasOne(MaxInfo, {
    foreignKey: 'accountInfoId'
});

MaxInfo.belongsTo(AccountInfo, {
    foreignKey: 'accountInfoId'
});

/* AccountInfo.hasOne(Exercise, {
    foreignKey: 'accountInfoId'
});

AccountInfo.belongsTo(MaxInfo, {
    foreignKey: 'accountInfoId'
}); */


module.exports = {AccountInfo, MaxInfo, Exercise};