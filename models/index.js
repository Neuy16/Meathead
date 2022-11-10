const AccountInfo = require('./user');
const MaxInfo = require('./maxInfo');
const Exercise = require('./exercise');

AccountInfo.hasOne(MaxInfo, {
    foreignKey: 'accountInfoId'
});

MaxInfo.belongsTo(AccountInfo, {
    foreignKey: 'accountInfoId'
});

module.exports = {AccountInfo, MaxInfo, Exercise};