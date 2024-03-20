import { prisma } from "../server";
import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/handleResponse";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, brand, model_year, quantity, color, availability } =
      req.body;
    const post = await prisma.product.create({
      data: {
        name,
        price,
        brand,
        model_year,
        quantity,
        color,
        availability,
      },
    });
    res.status(201).json(post);
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _page, _limit, _name } = req.query;
    const page = parseInt(_page as string) || 1;
    const limit = parseInt(_limit as string) || 10;
    const name = _name as string | undefined;

    const offset = (page - 1) * limit;

    let products;
    let totalCount;

    if (name) {
      products = await prisma.product.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: "desc",
        },
      });

      totalCount = await prisma.product.count({
        where: {
          name: {
            contains: name,
          },
        },
      });
    } else {
      products = await prisma.product.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: "desc",
        },
      });

      totalCount = await prisma.product.count();
    }

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({ totalPages, products });
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return handleResponse(res, 404, "Product not found");
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

const deleteAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.product.deleteMany({});
    res.status(200).json({ message: "All products deleted successfully" });
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

export default {
  createProduct,
  getAllProducts,
  deleteProduct,
  deleteAllProducts,
};
