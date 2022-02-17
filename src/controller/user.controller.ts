import { Request, response, Response } from "express";
import { createUser } from "../service/user.service";
import {omit} from 'lodash'
import log from "../logger";

export async function createUserHandler(req: Request, res: Response){
    try{
        const user = await createUser(req.body);
        return res.send(omit(user?.toJSON(), 'password'));
        
    }catch(e){
        log.error(e);
        return res.status(409).send("Error");
    }
}