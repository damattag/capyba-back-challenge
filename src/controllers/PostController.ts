import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import { PostSchema, PostUpdateSchema } from "../DTO";
import { PostRepository } from "../repositories";
import { PostGetSchema } from "../DTO/Post";

class PostController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = PostSchema.parse(req.body);

      const post = await PostRepository.create(data);

      res.status(201).json({
        data: post,
        message: "Post criado com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { page, limit, isDraft, order, orderField } = PostGetSchema.parse(
        req.query,
      );

      const userExists = await PostRepository.findById(id);

      if (!userExists) {
        throw createHttpError(404, "Usuário não encontrado.");
      }

      const { count, posts } = await PostRepository.findByUser(
        id,
        page,
        limit,
        isDraft,
        orderField,
        order,
      );

      res.status(200).json({
        data: {
          posts,
          count,
        },
        message: "Posts encontrados com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const post = await PostRepository.findById(id);

      if (!post) {
        throw createHttpError(404, "Post não encontrado.");
      }

      res.status(200).json({
        data: post,
        message: "Post encontrado com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, page, limit, isDraft, order, orderField } =
        PostGetSchema.parse(req.query);

      const { posts, count } = search
        ? await PostRepository.findByText(
            search,
            page,
            limit,
            isDraft,
            orderField,
            order,
          )
        : await PostRepository.findAll(page, limit, isDraft, orderField, order);

      res.status(200).json({
        data: {
          posts,
          count,
        },
        message: "Posts encontrados com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = PostUpdateSchema.parse(req.body);

      const postExists = await PostRepository.findById(id);

      if (!postExists) {
        throw createHttpError(404, "Post não encontrado.");
      }

      const post = await PostRepository.update(id, data);

      res.status(200).json({
        data: post,
        message: "Post atualizado com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const postExists = await PostRepository.findById(id);

      if (!postExists) {
        throw createHttpError(404, "Post não encontrado.");
      }

      const post = await PostRepository.delete(id);

      res.status(200).json({
        data: post,
        message: "Post deletado com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new PostController();
