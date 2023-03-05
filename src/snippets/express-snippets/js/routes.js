//#region Import
import { Router } from "express";
//#endregion

//#region Action
const Router = Router()

// Template
Router.post('/link', Controller)

// When adding authentication middleware
Router.post('/link', AuthenticationMiddleWare, Controller)

//#endregion

export { Router }