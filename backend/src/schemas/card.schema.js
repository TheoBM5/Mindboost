import { z } from "zod";

export const createCardSchema = z.object({
    front: z
      .string({
        required_error: "Es requerido un texto en la tarjeta",
      })
      .min(1)
      .max(255),
    reverse: z
      .string({
        required_error: "Es requerido un texto en la tarjeta",
      })
      .min(1)
      .max(255)
  });


  export const updateCardSchema = z.object({
    title: z
      .string({
        required_error: "Es requerido un texto en la tarjeta",
      })
      .min(1)
      .max(255),
    description: z
      .string({
        required_error: "Es requerido un texto en la tarjeta",
      })
      .min(1)
      .max(255)
    });