import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../service/prisma";

const getArtistQueryParams = z.object({
    search: z.string().optional(),
    limit: z.coerce.number().default(10),
    page: z.coerce.number().default(1),
});

const artistSchema = z.object({
    name: z.string(),
    photo: z.string().url(),
    id: z.string().uuid(),
});

const artistsSchema = z.array(artistSchema);

const getArtistSuccessResponse = z.object({
    artists: artistsSchema,
});

export async function getArtists(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/api/artists",
        {
            schema: {
                summary: "Get artists",
                description: "Get all artists",
                tags: ["Artist"],
                querystring: getArtistQueryParams,
                response: {
                    200: getArtistSuccessResponse,
                },
            },
        },
        async (request, reply) => {
            const { limit, page, search } = request.query;

            const artists = await prisma.artist.findMany({
                where: search ? { name: { contains: search,mode: "insensitive" } } : {},
                select: {
                    name: true,
                    photo: true,
                    id: true,
                },
                take: limit,
                skip: (page - 1) * limit,
            });

            return reply.send({
                artists,
            })
        }
    );
}
