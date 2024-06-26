import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../service/prisma";
import { BadRequest } from "../_erros/BadRequest";

const getAlbumRouteParams = z.object({
    id: z.string().uuid(),
});

const artistSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
});

const musicSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    photo: z.string().url(),
    artists: z.array(artistSchema),
    url: z.string().url(),
});

export const albumSchema = z.object({
    name: z.string(),
    id: z.string().uuid(),
    artistsOwner: z.array(artistSchema),
    description: z.string(),
    photo: z.string().url(),
    musics: z.array(musicSchema),
});

const getAlbumSuccessResponse = z.object({
    album: albumSchema,
});

type AlbumInformationTypes = z.infer<typeof albumSchema>

 export async function getAlbum(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/api/albums/:id",
        {
            schema: {
                summary: "Get album",
                description: "Get album by id",
                tags: ["Album"],
                params: getAlbumRouteParams,
                response: {
                    200: getAlbumSuccessResponse,
                },
                
            },
        },
        async (request, reply) => {
            const { id } = request.params;

            const album = await prisma.album.findUnique({
                where: {
                    id,
                },
                select: {
                    name: true,
                    id: true,
                    photo: true,
                    description:true,
                    musics: {
                        select: {
                            name: true,
                            id: true,
                            artists: {
                                select: {
                                    name: true,
                                    id: true,
                                },
                            },
                            photo: true,
                            url: true,
                        },
                    },
                    
                    artists: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                  
                },
            });

            if (!album) {
                throw new BadRequest("Can't find album");
            }

            const albumInformation : AlbumInformationTypes = {
                name: album.name,
                id: album.id,
                description: album.description,
                artistsOwner: album.artists,
                photo: album.photo,
                musics: album.musics,
            };

            return reply.code(200).send({
                album: albumInformation,
            });
        }
    );
}
