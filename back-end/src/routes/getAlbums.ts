import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../service/prisma";

const getAlbumsQueryParams = z.object({
    search: z.string().optional(),
    limit: z.coerce.number().default(10),
    page: z.coerce.number().default(1),
});

const albumSchema = z.object({
    id: z.string().uuid(), // Enforces UUID format for album ID (optional)
    name: z.string(),
    photo: z.string().url(),
    description: z.string().nullable(),
});

const albums = z.array(albumSchema);

const getAlbumsSuccessResponse = z.object({
    albums: albums,
})


export async function getAlbums(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/api/albums",
        {
            schema: {
                summary: "Get albums",
                description: "Get all albums",
                tags: ["Album"],
                querystring: getAlbumsQueryParams,
                response: {
                    200: getAlbumsSuccessResponse,
                }
            },
        },

        async (request, reply) => {
            const { limit, page, search } = request.query;
           
            const albums = await prisma.album.findMany({
                where:  search ? { name: { contains: search } } : {},
                take: limit,
                skip: (page -1) * limit,
            });

            return reply.code(200).send({
                albums,
            });
        }
    );
}
