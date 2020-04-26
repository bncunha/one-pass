import { IRoutes } from "./IRoutes";
import { Router } from "express";
import { InscricaoService } from "../services/Inscricao.service";

export class InscricaoRoute implements IRoutes {

    routes(): Router {
        const router = Router();
        const controller = new InscricaoService();
        router.get('/', controller.getPaginado.bind(controller));
        router.post('/', controller.create.bind(controller));
        router.put('/:id', controller.update.bind(controller));
        return router;
    }
}