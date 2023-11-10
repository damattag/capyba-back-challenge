import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

import { CommentSchema, CommentGetSchema, CommentUpdateSchema } from "../DTOs";
import {
  CommentRepository,
  PostRepository,
  UserRepository,
} from "../repositories";

class CommentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = CommentSchema.parse(req.body);

      const comment = await CommentRepository.create(data);

      res.status(201).json({
        data: comment,
        message: "Comentário criado com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readByPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { page, limit, order, orderField, isEdited } =
        CommentGetSchema.parse(req.query);

      const { count, comments } = await CommentRepository.findByPost(
        id,
        page,
        limit,
        isEdited,
        orderField,
        order,
      );

      const postExists = await PostRepository.findById(id);

      if (!postExists) {
        throw createHttpError(404, "Post não encontrado.");
      }

      res.status(200).json({
        data: {
          comments,
          count,
        },
        message: "Comentários encontrados com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { page, limit, order, orderField, isEdited } =
        CommentGetSchema.parse(req.query);

      const userExists = await UserRepository.findById(id);

      if (!userExists) {
        throw createHttpError(404, "Usuário não encontrado.");
      }

      const { count, comments } = await CommentRepository.findByUser(
        id,
        page,
        limit,
        isEdited,
        orderField,
        order,
      );

      res.status(200).json({
        data: {
          comments,
          count,
        },
        message: "Comentários encontrados com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const comment = await CommentRepository.findById(id);

      if (!comment) {
        throw createHttpError(404, "Comentário não encontrado.");
      }

      res.status(200).json({
        data: comment,
        message: "Comentário encontrado com sucesso.",
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, page, limit, order, orderField, isEdited } =
        CommentGetSchema.parse(req.query);

      const { count, comments } = search
        ? await CommentRepository.findByText(
            search,
            page,
            limit,
            isEdited,
            orderField,
            order,
          )
        : await CommentRepository.findAll(
            page,
            limit,
            isEdited,
            orderField,
            order,
          );

      res.status(200).json({
        data: {
          comments,
          count,
        },
        message: "Comentários encontrados com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = CommentUpdateSchema.parse(req.body);

      const commentExists = await CommentRepository.findById(id);

      if (!commentExists) {
        throw createHttpError(404, "Comentário não encontrado.");
      }

      const comment = await CommentRepository.update(id, {
        ...data,
        edited: true,
      });

      res.status(200).json({
        data: comment,
        message: "Comentário atualizado com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const commentExists = await CommentRepository.findById(id);

      if (!commentExists) {
        throw createHttpError(404, "Comentário não encontrado.");
      }

      const comment = await CommentRepository.delete(id);

      res.status(200).json({
        data: comment,
        message: "Comentário deletado com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new CommentController();
