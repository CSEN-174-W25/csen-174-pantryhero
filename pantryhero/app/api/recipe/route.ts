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
        res.status(45).end('Method ${req.method} Not Allowed');
    }
}



// /* ../app/cookbook/page.module.css */
// .container {
//     max-width: 600px;
//     margin: 0 auto;
//     padding: 20px;
//     text-align: center;
//   }
  
//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//   }
  
//   input {
//     padding: 10px;
//     font-size: 16px;
//   }
  
//   button {
//     padding: 10px;
//     font-size: 16px;
//     background-color: #0070f3;
//     color: white;
//     border: none;
//     cursor: pointer;
//   }
  
//   button:hover {
//     background-color: #005bb5;
//   }
  
//   p {
//     margin-top: 20px;
//     font-size: 16px;
//     color: green;
//   }

