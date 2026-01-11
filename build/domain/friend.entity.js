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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequest = exports.FriendRequestStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var FriendRequestStatus;
(function (FriendRequestStatus) {
    FriendRequestStatus["PENDING"] = "Pending";
    FriendRequestStatus["APPROVE"] = "Approve";
    FriendRequestStatus["REJECT"] = "Reject";
    FriendRequestStatus["BLOCK"] = "Block";
})(FriendRequestStatus || (exports.FriendRequestStatus = FriendRequestStatus = {}));
let FriendRequest = class FriendRequest extends typeorm_1.BaseEntity {
};
exports.FriendRequest = FriendRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], FriendRequest.prototype, "REQUEST_ID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (userRequest) => userRequest.SEND_REQUESTS, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'SENDER' }),
    __metadata("design:type", user_entity_1.User)
], FriendRequest.prototype, "SENDER", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (userRequest) => userRequest.RECEIVED_REQUESTS, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'RECEIVER' }),
    __metadata("design:type", user_entity_1.User)
], FriendRequest.prototype, "RECEIVER", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: FriendRequestStatus, default: FriendRequestStatus.PENDING }),
    __metadata("design:type", String)
], FriendRequest.prototype, "STATUS", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], FriendRequest.prototype, "CREATED_DATE", void 0);
exports.FriendRequest = FriendRequest = __decorate([
    (0, typeorm_1.Entity)({ name: "FRIEND_USER" }),
    (0, typeorm_1.Index)('idx_friend_requests_sender_id', ['SENDER']),
    (0, typeorm_1.Index)('idx_friend_requests_receiver_id', ['RECEIVER']),
    (0, typeorm_1.Index)('idx_friend_requests_status', ['STATUS'])
], FriendRequest);
