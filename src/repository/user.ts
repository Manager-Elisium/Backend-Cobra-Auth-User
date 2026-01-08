import { User } from "src/domain/user.entity";
import { FindOptionsWhere, In } from "typeorm";

async function create(data: User) {
    return User.save(data);
}

async function getBy(data: FindOptionsWhere<User>) {
    return User.findOneBy(data);
}

async function countEmail(EMAIL: string, USER_NAME: string, MOBILE_NO: string) {
    return User.count({ where: [{ EMAIL }, { USER_NAME }, { MOBILE_NO }] });
}

async function countMobile(MOBILE_NO: string) {
    return User.count({ where: { MOBILE_NO } });
}

async function countUsername(USER_NAME: string) {
    return User.count({ where: { USER_NAME } });
}

async function updateById(id: string, data: User) {
    return User.update(id, data)
}


async function updateSocketId(SOCKET_ID: string, data: User) {
    return User.update({ SOCKET_ID }, { ONLINE: data.ONLINE, SOCKET_ID: null })
}


async function multipleById(data: any) {
    return await User.createQueryBuilder()
        .where("User.ID IN (:...ids)", { ids: data })
        .select(['User.ID', 'User.AVATAR', 'User.FB_PROFILE',
            'User.FRAME', 'User.USER_NAME', 'User.COUNTRY_CODE',
            'User.SOCKET_ID', 'User.ONLINE'])
        .getMany();
}


async function paginateList(query: any) {
    return await User.findAndCount(query);
}


async function countryList(countryCode: string) {
    return await User.find({
        where: { COUNTRY_CODE: countryCode }
    })
}

async function clubUserSearchById(data: any) {
    return await User.createQueryBuilder()
        .where('LOWER(User.USER_NAME) LIKE LOWER(:nameKeyword) OR User.USER_ID = :searchId', {
            nameKeyword: `%${data.name_id}%`,
            searchId: `%${data.name_id}%`
        })
        .select(['User.ID', 'User.AVATAR', 'User.FB_PROFILE',
            'User.FRAME', 'User.USER_NAME', 'User.COUNTRY_CODE',
            'User.SOCKET_ID', 'User.ONLINE', 'User.USER_ID'])
        .getOne();
}

export {
    create, getBy, countEmail, updateById,
    countMobile, multipleById, updateSocketId, countUsername,
    paginateList, countryList, clubUserSearchById
};
