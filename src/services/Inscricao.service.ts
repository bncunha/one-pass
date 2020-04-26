import { DefaultService } from "./DefaultService";
import { Inscricao } from "../models/Inscricao";
import { InscricaoDAO } from "../dao/Inscricao.dao";
import { Request, Response } from "express";
import { DefaultResponse } from "../value-objects/DefaultResponse";
import { CriptografiaService } from "./Criptografia.service";
import { InscricaoDTO } from "../value-objects/InscricaoDTO";

export class InscricaoService extends DefaultService<Inscricao> {
    
    criptografiaService = new CriptografiaService();

    constructor() {
        super(new InscricaoDAO('Inscricao'));
    }

    async create(req: Request, res: Response): Promise<DefaultResponse> {
        return this.saveInscricao(req, res, new Inscricao());
    }
    
    async update(req: any, res: any): Promise<DefaultResponse> {
        return this.saveInscricao(req, res, await this.dao.findById(req.params.id));
    }

    async saveInscricao(req: any, res: any, insc: Inscricao) {
        const inscricao = Object.assign(insc, req.body);
        const dataCriptografia = new Date();
        // TODO - pegar o nome do usuario
        const nomeUsuario = 'bruno';
        const secretHash = 'Qwe1!324E%%' + nomeUsuario + dataCriptografia.getTime();
        
        inscricao.dataCriptografia = dataCriptografia;
        inscricao.nome = this.criptografiaService.criptografarTwoWay(inscricao.nome, secretHash, dataCriptografia);
        inscricao.site = this.criptografiaService.criptografarTwoWay(inscricao.site, secretHash, dataCriptografia);
        inscricao.login = this.criptografiaService.criptografarTwoWay(inscricao.login, secretHash, dataCriptografia);
        inscricao.senha = this.criptografiaService.criptografarTwoWay(inscricao.senha, secretHash, dataCriptografia);
        // TODO - Acertar o nome do usuario
        inscricao.usuario = 1 as any;

        const inscricaoSaved = await this.dao.save(inscricao);
        return new DefaultResponse().success(res, inscricaoSaved);
    }

}