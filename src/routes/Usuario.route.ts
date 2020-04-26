import { IRoutes } from "./IRoutes";
import { Router } from "express";
import { UsuarioService } from "../services/Usuario.service";

export class UsuarioRoute implements IRoutes {

    routes(): Router {
        const router = Router();
        const controller = new UsuarioService();
        router.get('/', controller.getPaginado.bind(controller));
        router.post('/', controller.create.bind(controller));
        router.put('/:id', controller.update.bind(controller));
        return router;
    }

}