import { DefaultResponse } from "../value-objects/DefaultResponse";
import { CriptografiaService } from "./Criptografia.service";
import { UsuarioService } from "./Usuario.service";
import { LoginResponseDTO } from "../value-objects/LoginResponseDTO";
import jwt from "jsonwebtoken";
import { environment } from "../../environments/envi";

export class AutenticacaoService {

    criptografiaService = new CriptografiaService();
    usuarioService = new UsuarioService();

    async login(req: any, res: any): Promise<DefaultResponse> {
        const login = req.body.login;
        const pass = req.body.pass;
        try {
            const usuarioFinded = await this.usuarioService.findByLogin(login);
            if (!usuarioFinded) {
                throw 'Login ou senha estão incorretos!';
            }
            if (this.criptografiaService.verificarCriptografiaOneWay(pass, usuarioFinded.senha) == false) {
                throw 'Login ou senha estão incorretos!';
            }

            const token = jwt.sign({id: usuarioFinded.idUsuario}, environment.JWT_SECRET, {expiresIn: environment.JWT_EXPIRES});
            const loginResponse = new LoginResponseDTO();
            loginResponse.nome = usuarioFinded.nome;
            loginResponse.token = token;

            return new DefaultResponse().success(res, loginResponse); 
        } catch(err) {
            return new DefaultResponse().error(res, err)
        }
    }
}