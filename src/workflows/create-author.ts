import {
    createStep,
    StepResponse,
  } from "@medusajs/framework/workflows-sdk"
  import { AUTHOR_MODULE } from "../modules/authors"
  import AuthorModuleService from "../modules/authors/service"
  import {
    createWorkflow,
    WorkflowResponse,
  } from "@medusajs/framework/workflows-sdk"
  
  export type CreateAuthorStepInput = {
    name: string
  }
  
  type CreateAuthorWorkflowInput = {
    name: string
  }
  
  export const createAuthorStep = createStep(
    "create-author-step",
    async (input: CreateAuthorStepInput, { container }) => {
      const authorModuleService: AuthorModuleService = container.resolve(
        AUTHOR_MODULE
      )
  
      const author = await authorModuleService.createAuthors(input)
  
      return new StepResponse(author, author.id)
    },
  
    async (id: string, { container }) => {
      const authorModuleService: AuthorModuleService = container.resolve(
        AUTHOR_MODULE
      )
  
      await authorModuleService.deleteAuthors(id)
    }
  )
  
  export const createAuthorWorkflow = createWorkflow(
    "create-author",
    (input: CreateAuthorWorkflowInput) => {
      const author = createAuthorStep(input)
  
      return new WorkflowResponse(author)
    }
  )
  