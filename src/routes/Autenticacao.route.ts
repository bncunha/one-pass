import { IRoutes } from "./IRoutes";
import { Router } from "express";
import { AutenticacaoService } from "../services/Autenticacao.service";

export class AutenticacaoRoute implements IRoutes {

    routes(): Router {
        const router = Router();
        const controller = new AutenticacaoService();
        router.post('/', controller.login.bind(controller));
        return router;
    }

}