"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserType = void 0;
const ormconfig_1 = require("src/libs/ormconfig");
const typeorm_1 = require("typeorm");
const friend_entity_1 = require("./friend.entity");
var UserType;
(function (UserType) {
    UserType["GMAIL"] = "Gmail";
    UserType["FACEBOOK"] = "Facebook";
    UserType["APPLE"] = "Apple";
    UserType["CUSTOM"] = "Custom";
    UserType["GUEST"] = "Guest";
})(UserType || (exports.UserType = UserType = {}));
let User = User_1 = class User extends typeorm_1.BaseEntity {
    async assignGuestSequence() {
        if (this.TYPE === UserType.GUEST) {
            const entityManager = ormconfig_1.AppDataSource.getRepository(User_1);
            const sequenceQuery = "SELECT nextval('guest_sequence')";
            const result = await entityManager.query(sequenceQuery);
            this.USER_NAME = `GUEST_${result[0].nextval}`;
            this.USER_ID = `GUEST_${result[0].nextval}`;
        }
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], User.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "USER_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "MOBILE_NO", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "EMAIL", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "PASSWORD", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "LANGUAGE", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "USER_ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "AVATAR", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "FB_PROFILE", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "IN" }),
    __metadata("design:type", String)
], User.prototype, "COUNTRY_CODE", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "FRAME", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: UserType, default: UserType.GUEST }),
    __metadata("design:type", String)
], User.prototype, "TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "CREATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "UPDATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "DELETED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "IS_DISABLE_IN_GAME_CHAT", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "IS_SOUND", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "IS_FRIEND_REQUESTS_FROM_OTHERS", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "IS_SHOW_ONLINE_STATUS", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friend_entity_1.FriendRequest, (friendRequest) => friendRequest.SENDER),
    __metadata("design:type", Array)
], User.prototype, "SEND_REQUESTS", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friend_entity_1.FriendRequest, (friendRequest) => friendRequest.RECEIVER),
    __metadata("design:type", Array)
], User.prototype, "RECEIVED_REQUESTS", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "ONLINE", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "SOCKET_ID", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "assignGuestSequence", null);
exports.User = User = User_1 = __decorate([
    (0, typeorm_1.Entity)({ name: "USER" })
], User);
