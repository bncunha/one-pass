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
        const inscricaoDTO: InscricaoDTO = req.body;
        const inscricao: Inscricao = Object.assign(new Inscricao(), req.body);

        const dataCriptografia = new Date();
        const nomeUsuario = 'bruno';
        const secretHash = 'Qwe1!324E%%' + nomeUsuario + dataCriptografia.getTime();
        
        inscricao.dataCriptografia = dataCriptografia;
        inscricao.nome = this.criptografiaService.criptografarTwoWay(inscricao.nome, secretHash, dataCriptografia);
        inscricao.site = this.criptografiaService.criptografarTwoWay(inscricao.site, secretHash, dataCriptografia);
        inscricao.login = this.criptografiaService.criptografarTwoWay(inscricao.login, secretHash, dataCriptografia);
        inscricao.senha = this.criptografiaService.criptografarTwoWay(inscricao.senha, secretHash, dataCriptografia);
        inscricao.usuario = 1 as any;

        const inscricaoSaved = await this.dao.save(inscricao);
        return new DefaultResponse().success(res, inscricaoSaved);
    }
    
    update(req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("express-serve-static-core").Query>, res: import("express").Response<any>): Promise<import("../value-objects/DefaultResponse").DefaultResponse> {
        throw new Error("Method not implemented.");
    }

}