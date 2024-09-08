import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import swaggerSetup from './swagger.js';


const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());
swaggerSetup(app);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - age
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         age:
 *           type: integer
 *           description: Idade do usuário
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.post('/usuarios', async (request, response) => {
    await prisma.user.create({
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    });
    response.status(201).json(request.body);
});

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna uma lista de usuários
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nome do usuário para filtrar
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Email do usuário para filtrar
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Idade do usuário para filtrar
 *     responses:
 *       200:
 *         description: A lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get('/usuarios', async (request, response) => {
    let users = [];
    if (request.query) {
        users = await prisma.user.findMany({
            where: {
                name: request.query.name,
                email: request.query.email,
                age: request.query.age
            }
        });
    } else {
        users = await prisma.user.findMany();
    }
    response.status(200).json(users);
});

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.put('/usuarios/:id', async (request, response) => {
    await prisma.user.update({
        where: { id: Number(request.params.id) },
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    });
    response.status(200).json(request.body);
});

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.delete('/usuarios/:id', async (request, response) => {
    await prisma.user.delete({
        where: { id: request.params.id }
    });
    response.status(200).json({ message: 'Usuário deletado com sucesso!' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
