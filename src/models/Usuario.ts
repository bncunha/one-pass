import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Inscricao } from "./Inscricao";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    idUsuario: number;

    @Column({
        nullable: false
    })
    login: string;

    @Column({
        nullable: false
    })
    senha: string;

    @OneToMany(type => Inscricao, insc => insc.usuario)
    inscricoes: Inscricao[];
}