import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../service/prisma";
import { BadRequest } from "../_erros/BadRequest";

 const getArtistRouteParams = z.object({
    id: z.string().uuid(),
});

const musicSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    photo: z.string(),
    url: z.string().url(),
    albumId: z.string().nullable(),
});

const albumSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    photo: z.string(),
});

 const artistSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    photo: z.string(),
    music: z.array(musicSchema),
    albums: z.array(albumSchema),
});

const getArtistSuccessResponse = z.object({
    artist: artistSchema,

})



export async function getArtist(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/api/artists/:id",
        { schema: 
                { 
                    summary: "Get artist",
                    description: "Get artist by id",
                    tags: ["Artist"],
                    params: getArtistRouteParams,
                    response: {
                        200: getArtistSuccessResponse,
                    } 
                } 
        },
        async (request, reply) => {
            const { id } = request.params;

            const artist = await prisma.artist.findUnique({
                where: {
                    id: id,
                },
                select: {
                    name: true,
                    id: true,
                    photo: true,
                    music: {
                        select: {
                            id: true,
                            name: true,
                            photo: true,
                            url: true,
                            albumId: true,
                        },
                    },
                    albums: {
                        select: {
                            id: true,
                            name: true,
                            photo: true,
                            
                        },
                    },
                },
            });

            if(!artist){
                throw new BadRequest("Can't find artist");
            }


            return reply.code(200).send({ artist: artist });
        }
    );
}
