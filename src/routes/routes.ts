import { Router, Application } from "express";
import { InscricaoRoute } from "./Inscricao.route";


export class Routes {

    initRoutes(app: Application) {
        const inscricaoRoutes = new InscricaoRoute();
        // const pedidoRoutes = new PedidoRoutes();
        app.use('/inscricoes', inscricaoRoutes.routes());
        // app.use('/pedidos', pedidoRoutes.routes());
    }
}