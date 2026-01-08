import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, BaseEntity } from 'typeorm';
import { User } from './user.entity';


export enum FriendRequestStatus {
    PENDING = "Pending",
    APPROVE = "Approve",
    REJECT = "Reject",
    BLOCK = "Block"
}

@Entity({ name: "FRIEND_USER" })
@Index('idx_friend_requests_sender_id', ['SENDER'])
@Index('idx_friend_requests_receiver_id', ['RECEIVER'])
@Index('idx_friend_requests_status', ['STATUS'])
export class FriendRequest extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    REQUEST_ID: string;

    @ManyToOne(() => User, (userRequest) => userRequest.SEND_REQUESTS, { nullable: false })
    @JoinColumn({ name: 'SENDER' })
    SENDER: User;

    @ManyToOne(() => User, (userRequest) => userRequest.RECEIVED_REQUESTS, { nullable: false })
    @JoinColumn({ name: 'RECEIVER' })
    RECEIVER: User;

    @Column('enum', { enum: FriendRequestStatus, default: FriendRequestStatus.PENDING })
    STATUS: string;

    @Column({ type: 'timestamptz', default: () => 'NOW()' })
    CREATED_DATE: Date;
}
