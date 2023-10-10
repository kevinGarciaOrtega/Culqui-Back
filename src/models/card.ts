import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 16, unique: true })
  token!: string;

  @Column({ length: 16 })
  cardNumber!: string;

  @Column({ length: 4 })
  cvv!: string;

  @Column({ length: 4 })
  expirationYear!: string;

  @Column({ length: 2 })
  expirationMonth!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({ length: 255 })
  nombrePropiedad!: string;

}
