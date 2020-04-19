import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Inscricao {
    @PrimaryGeneratedColumn()
    idInscricao: number;

    @Column({
        nullable: false
    })
    nome: string;
    
    @Column()
    site: string;

    @Column()
    login: string;

    @Column({
        nullable: false
    })
    senha: string;

    @Column({
        nullable: false
    })
    dataCriptografia: Date;

    @ManyToOne(type => Usuario, usuario => usuario.inscricoes)
    usuario: Usuario;

}