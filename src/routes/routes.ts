import { Router, Application } from "express";
import { InscricaoRoute } from "./Inscricao.route";
import { UsuarioRoute } from "./Usuario.route";


export class Routes {

    initRoutes(app: Application) {
        const inscricaoRoutes = new InscricaoRoute();
        const usuarioRoutes = new UsuarioRoute();
        // const pedidoRoutes = new PedidoRoutes();
        app.use('/inscricoes', inscricaoRoutes.routes());
        app.use('/usuarios', usuarioRoutes.routes());
        // app.use('/pedidos', pedidoRoutes.routes());
    }
}