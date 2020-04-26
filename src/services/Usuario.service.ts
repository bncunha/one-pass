import { DefaultService } from "./DefaultService";
import { Usuario } from "../models/Usuario";
import { DefaultResponse } from "../value-objects/DefaultResponse";
import { UsuarioDTO } from "../value-objects/UsuarioDTO";
import { UsuarioDAO } from "../dao/Usuario.dao";
import { CriptografiaService } from "./Criptografia.service";

export class UsuarioService extends DefaultService<Usuario> {

    criptografiaService = new CriptografiaService();

    constructor() {
        super(new UsuarioDAO('Usuario'));
    }

    async create(req: any, res: any): Promise<DefaultResponse> {
        return this.saveUsuario(req, res, new Usuario());
    }
    
    async update(req: any, res: any): Promise<DefaultResponse> {
        return this.saveUsuario(req, res, await this.dao.findById(req.params.id));
    }
    
    async saveUsuario(req: any, res: any, usuarioDTO: Usuario) {
        try {
            const usuario = Object.assign(usuarioDTO, req.body as UsuarioDTO);
            if (usuario.senha) {
                usuario.senha = this.criptografiaService.criptografarOneWay(usuario.senha);
            }
            return new DefaultResponse().success(res, await this.dao.save(usuario));
        } catch(err) {
            return new DefaultResponse().error(res, err);
        }
    }

    async findByLogin(login: string): Promise<Usuario> {
        return await (await this.dao.findWithParams({
            where: {login: login}
        }))[0];
    }

}