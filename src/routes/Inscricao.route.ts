import { IRoutes } from "./IRoutes";
import { Router } from "express";
import { InscricaoService } from "../services/Inscricao.service";

export class InscricaoRoute implements IRoutes {

    routes(): Router {
        const router = Router();
        const controller = new InscricaoService();
        router.post('/', controller.create.bind(controller));
        return router;
    }
}