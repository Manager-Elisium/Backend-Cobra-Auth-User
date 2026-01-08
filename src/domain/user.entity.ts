import { AppDataSource } from "src/libs/ormconfig";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, OneToMany } from "typeorm"
import { FriendRequest } from "./friend.entity";


export enum UserType {
    GMAIL = "Gmail",
    FACEBOOK = "Facebook",
    APPLE = "Apple",
    CUSTOM = "Custom",
    GUEST = "Guest"
}


@Entity({ name: "USER" })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ unique: true })
    USER_NAME: string;

    @Column({ nullable: true })
    MOBILE_NO: string;

    @Column({ nullable: true })
    EMAIL: string;

    @Column({ nullable: true })
    PASSWORD: string;

    @Column({ nullable: true })
    LANGUAGE: string;

    @Column({ nullable: true })
    USER_ID: string;

    @Column({ nullable: true })
    AVATAR: string;

    @Column({ nullable: true })
    FB_PROFILE: string;

    @Column({ default: "IN" })
    COUNTRY_CODE: string;

    @Column({ nullable: true })
    FRAME: string;

    @Column('enum', { enum: UserType, default: UserType.GUEST })
    TYPE: UserType;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE: Date;

    @Column('timestamp with time zone', { nullable: true })
    DELETED_DATE: Date;

    @Column({ type: 'boolean', default: false })
    IS_DISABLE_IN_GAME_CHAT: boolean;
    
    @Column({ type: 'boolean', default: false })
    IS_SOUND: boolean;

    @Column({ type: 'boolean', default: false })
    IS_FRIEND_REQUESTS_FROM_OTHERS: boolean;

    @Column({ type: 'boolean', default: false })
    IS_SHOW_ONLINE_STATUS: boolean;

    @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.SENDER)
    SEND_REQUESTS: FriendRequest[];

    @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.RECEIVER)
    RECEIVED_REQUESTS: FriendRequest[];

    @Column({ default: false })
    ONLINE: boolean;

    @Column({ nullable: true })
    SOCKET_ID: string;

    @BeforeInsert()
    async assignGuestSequence() {
        if (this.TYPE === UserType.GUEST) {
            const entityManager = AppDataSource.getRepository(User);
            const sequenceQuery = "SELECT nextval('guest_sequence')";
            const result = await entityManager.query(sequenceQuery);
            this.USER_NAME = `GUEST_${result[0].nextval}`;
            this.USER_ID = `GUEST_${result[0].nextval}`;
        }
    }

}