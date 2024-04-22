import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../service/prisma";
import { BadRequest } from "../_erros/BadRequest";

const getMusicRouteParams = z.object({
    id: z.string().uuid(),
});

const artistSchema = z.object({
    id: z.string().uuid(),
    photo: z.string().url(),
    name: z.string(),
});

export const musicSchema = z.object({
    url: z.string().url(),
    id: z.string().uuid(),
    name: z.string(),
    artists: z.array(artistSchema),
});

const getMusicSuccessResponse = z.object({
    music: musicSchema,
});

export async function getMusic(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/api/music/:id",
        {
            schema: {
                summary: "Get music",
                description: "Get music by id",
                tags: ["Music"],
                params: getMusicRouteParams,
                response: {
                    200: getMusicSuccessResponse,
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params;

            const music = await prisma.music.findUnique({
                where: {
                    id,
                },
                select: {
                    url: true,
                    id: true,
                    name: true,
                    artists: {
                        select: {
                            photo: true,
                            name: true,
                            id: true,
                        },
                    },
                },
            });

            if (!music) {
                throw new BadRequest("Music not found");
            }

            return reply.send({
                music: music,
            });
        }
    );
}
