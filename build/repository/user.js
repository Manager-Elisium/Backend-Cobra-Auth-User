"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.getBy = getBy;
exports.countEmail = countEmail;
exports.updateById = updateById;
exports.countMobile = countMobile;
exports.multipleById = multipleById;
exports.updateSocketId = updateSocketId;
exports.countUsername = countUsername;
exports.paginateList = paginateList;
exports.countryList = countryList;
exports.clubUserSearchById = clubUserSearchById;
const user_entity_1 = require("src/domain/user.entity");
async function create(data) {
    return user_entity_1.User.save(data);
}
async function getBy(data) {
    return user_entity_1.User.findOneBy(data);
}
async function countEmail(EMAIL, USER_NAME, MOBILE_NO) {
    return user_entity_1.User.count({ where: [{ EMAIL }, { USER_NAME }, { MOBILE_NO }] });
}
async function countMobile(MOBILE_NO) {
    return user_entity_1.User.count({ where: { MOBILE_NO } });
}
async function countUsername(USER_NAME) {
    return user_entity_1.User.count({ where: { USER_NAME } });
}
async function updateById(id, data) {
    return user_entity_1.User.update(id, data);
}
async function updateSocketId(SOCKET_ID, data) {
    return user_entity_1.User.update({ SOCKET_ID }, { ONLINE: data.ONLINE, SOCKET_ID: null });
}
async function multipleById(data) {
    return await user_entity_1.User.createQueryBuilder()
        .where("User.ID IN (:...ids)", { ids: data })
        .select(['User.ID', 'User.AVATAR', 'User.FB_PROFILE',
        'User.FRAME', 'User.USER_NAME', 'User.COUNTRY_CODE',
        'User.SOCKET_ID', 'User.ONLINE'])
        .getMany();
}
async function paginateList(query) {
    return await user_entity_1.User.findAndCount(query);
}
async function countryList(countryCode) {
    return await user_entity_1.User.find({
        where: { COUNTRY_CODE: countryCode }
    });
}
async function clubUserSearchById(data) {
    return await user_entity_1.User.createQueryBuilder()
        .where('LOWER(User.USER_NAME) LIKE LOWER(:nameKeyword) OR User.USER_ID = :searchId', {
        nameKeyword: `%${data.name_id}%`,
        searchId: `%${data.name_id}%`
    })
        .select(['User.ID', 'User.AVATAR', 'User.FB_PROFILE',
        'User.FRAME', 'User.USER_NAME', 'User.COUNTRY_CODE',
        'User.SOCKET_ID', 'User.ONLINE', 'User.USER_ID'])
        .getOne();
}
