import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../service/prisma";

const getArtistSongsRouteParams = z.object({
    id: z.string().uuid(),
});

const getArtistSongsSearchParams = z.object({
    limit: z.coerce.number().default(10),
    page: z.coerce.number().default(1),
})

const artistSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
});

const musicSchema = z.object({
    url: z.string().url(),
    id: z.string().uuid(),
    name: z.string(),
    photo: z.string().url(),
    artists: z.array(artistSchema),
})

const getArtistSongsSuccessResponse = z.object({
    musics: z.array(musicSchema)
})

export async function getArtistSongs(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/api/artists/:id/songs",
        {
            schema: {
                summary: "Get artist songs",
                description: "Get artist songs",
                tags: ["Artist"],
                params: getArtistSongsRouteParams,
                querystring: getArtistSongsSearchParams,
                response: {
                    200: getArtistSongsSuccessResponse
                }

            }

        },
        async (request, reply) => {
            const {id} = request.params
            const {limit,page} = request.query

            const artistMusic = await prisma.music.findMany({
                where: {
                    artists: {
                        some: {
                            id: id
                        }
                    }
                },
                skip: (page -1) * limit,
                take: limit,

                select: {
                    name: true,
                    photo: true,
                    url: true,
                    id: true,
                    artists: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            })

            reply.send({
                musics: artistMusic
            })
        }
    );
}
