import { 
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http"
import { PostAdminCreateBrand } from "./admin/brands/validators"
import { PostAdminCreateAuthor } from "./admin/authors/validators" // Import your authors validator
import { z } from "zod"


export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateBrand),
      ],
    },
    {
      matcher: "/admin/authors", // Add the new route for authors
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateAuthor), // Use the authors validator
      ],
    },
    {
      matcher: "/admin/products",
      method: ["POST"],
      additionalDataValidator: {
        brand_id: z.string().optional(),
      },
    },
  ],
})