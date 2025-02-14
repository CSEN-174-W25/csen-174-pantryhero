import {NextApiRequest, NextApiResponse} from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {url} = req.body;
        try {
            const newRecipe = await prisma.recipes.create({
                data: {
                    url,
                    created_at: new Date(),
                },
            });
            res.status(200).json(newRecipe);
        } catch (error) {
            res.status(500).json({Error: 'Error adding recipe'});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(45).end(`Method ${req.method} Not Allowed`);
    }
}
