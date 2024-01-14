import { Request, Response } from "express";
import { ClassModel } from "../models/Class";

export default async function matches(req: Request, res: Response): Promise<void> {
    try {
        console.log(req.body[0]);
        const className = req.body[0];
        const _class = await ClassModel.findOne({
            className,
        });

        if (!_class) {
            res.status(404).send("Class not found");
            return;
        }
        res.status(200).send(_class?.groupings);
    } catch (err) {
        console.error(err);
    }
}
