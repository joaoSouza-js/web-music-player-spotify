import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../service/prisma";

export const getMusicsSearchQueryParams = z.object({
    search: z.string().optional(),
    limit: z.coerce.number().default(10),
    page: z.coerce.number().default(1),
});

const artistSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
});

export const musicSchema = z.object({
    url: z.string().url(),
    id: z.string().uuid(),
    name: z.string(),
    photo: z.string().url(),
    artists: z.array(artistSchema),
});

const getMusicsSuccessResponse = z.object({
    musics: z.array(musicSchema),
});

export async function getMusics(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/api/musics",
        {
            schema: {
                summary: "Get musics",
                description: "Get all musics",
                tags: ["Music"],
                querystring: getMusicsSearchQueryParams,
                response: {
                    200: getMusicsSuccessResponse,
                },
            },
        },
        async (request, reply) => {
            const { limit, page, search } = request.query;
            const musics = await prisma.music.findMany({
                where: search ? { name: { contains: search,mode: "insensitive" } } : {},
                take: limit,
                skip:(page - 1) * limit,
                select: {
                    name: true,
                    url: true,
                    photo: true,
                    id: true,

                    artists: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
            });

            reply.send({
                musics: musics,
            });
        }
    );
}
