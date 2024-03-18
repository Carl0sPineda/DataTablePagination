import { z } from "zod";

export const CreateProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Product name is required")
      .max(50, "Must be less than 50 characters"),
    price: z.number().nonnegative("Price must be a non-negative number"),
    brand: z
      .string()
      .trim()
      .min(1, "Product brand is required")
      .max(50, "Must be less than 50 characters"),
    model_year: z
      .string()
      .regex(
        /^\d{2}\/\d{2}\/\d{4}$/,
        "Model year must be in the format dd/mm/yyyy"
      ),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    color: z
      .string()
      .trim()
      .min(1, "Product color is required")
      .max(20, "Must be less than 20 characters"),
    availability: z.boolean().optional(),
  }),
});

// export const UpdateProductSchema = z.object({
//   body: z.object({
//     name: z.string().optional(),
//     price: z.number().nonnegative().optional(),
//   }),
//   params: z.object({
//     id: z.string().min(3),
//   }),
//   query: z.object({
//     title: z.string(),
//   }),
// });

export type CreateProductType = z.infer<typeof CreateProductSchema>["body"];

// export type UpdateProductBodyType = z.infer<typeof UpdateProductSchema>["body"];
// export type UpdateProductParamsType = z.infer<
//   typeof UpdateProductSchema
// >["params"];
// export type UpdateProductQueryType = z.infer<
//   typeof UpdateProductSchema
// >["query"];
