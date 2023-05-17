import { 
	Entity, 
	PrimaryGeneratedColumn, 
	Column, 
	BaseEntity, 
	CreateDateColumn, 
	UpdateDateColumn, 
} from 'typeorm';

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 191, unique: true })
	username: string;

	@Column({ length: 100, nullable: true })
	first_name: string;

	@Column({ length: 100, nullable: true })
	last_name: string;

	@Column({ length: 10, nullable: true })
	timezone_country_code: string;

	@Column({ length: 5, nullable: true })
	timezone_utc_offset: string;

	@Column({ length: 50, nullable: true })
	timezone_info: string;

	@CreateDateColumn({ select: false })
	created_at: Date;

	@UpdateDateColumn({ select: false })
	updated_at: Date;

	@Column({ length: 10, nullable: true })
	locale: string;


}
