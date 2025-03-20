import {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/framework/http"

  import { createAuthorWorkflow } from "../../../workflows/create-author"
  import { z } from "zod"
  import { PostAdminCreateAuthor } from "./validators"
  
  type PostAdminCreateAuthorType = z.infer<typeof PostAdminCreateAuthor>
  
  // POST /admin/authors - Creates a new author
  export const POST = async (
    req: MedusaRequest<PostAdminCreateAuthorType>,
    res: MedusaResponse
  ) => {
    const { result } = await createAuthorWorkflow(req.scope).run({
      input: req.validatedBody,
    })
    
    res.json({ author: result })
  }
  
  // GET /admin/authors - Lists all authors
  export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
  ) => {
    const authorService = req.scope.resolve("authorService") // Ensure this exists
    const authors = await authorService.list() // Fetch all authors
    
    res.json({ authors })
  }
  
  