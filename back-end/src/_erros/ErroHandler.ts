import fastify, { FastifyInstance } from "fastify"
import { BadRequest } from "./BadRequest"
import { ZodError } from "zod"

type FastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: FastifyErrorHandler = (error,request,reply) => {
    const isValidationError = error instanceof ZodError

    if(isValidationError){
        return reply.status(400).send({
            message: "Error on validation",
            error: error.flatten().fieldErrors
        })
    }

    const isBadRequestError = error instanceof BadRequest

    if(isBadRequestError){
        return reply.status(400).send({
            message: error.message
        })
    }

    return reply.status(500).send({message: "Internal server error"})
}
