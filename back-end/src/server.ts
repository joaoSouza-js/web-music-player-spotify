import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
} from "fastify-type-provider-zod";

import fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";

import { getAlbum } from "./routes/getAlbum";
import { getAlbums } from "./routes/getAlbums";
import { getArtist } from "./routes/getArtist";
import { getMusics } from "./routes/getMusics";
import { getArtists } from "./routes/getArtists";
import { errorHandler } from "./_erros/ErroHandler";
import { getMusic } from "./routes/getMusic";

const app = fastify();

app.register(cors, {
    origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
    swagger: {
        consumes: ["application/json"],
        produces: ["application/json"],
        info: {
            title: "web player",
            description: "Epecificações  da Api para o back-end de um web player",
            version: "1.0.0",
        },
    },
    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
    prefix: "/docs",
});

app.register(getAlbum);
app.register(getAlbums);
app.register(getArtist);
app.register(getMusics);
app.register(getArtists);
app.register(getMusic)

app.setErrorHandler(errorHandler)

app.listen({ port: 3333 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
});
