// src/ai/flows/module-generator.ts
'use server';
/**
 * @fileOverview A module generator AI agent.
 *
 * - moduleGenerator - A function that handles the module generation process.
 * - ModuleGeneratorInput - The input type for the moduleGenerator function.
 * - ModuleGeneratorOutput - The return type for the moduleGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModuleGeneratorInputSchema = z.object({
  projectDescription: z.string().describe('The description of the project.'),
});
export type ModuleGeneratorInput = z.infer<typeof ModuleGeneratorInputSchema>;

const ModuleGeneratorOutputSchema = z.object({
  modules: z.array(
    z.object({
      name: z.string().describe('The name of the module.'),
      description: z.string().describe('The description of the module.'),
      deadline: z.string().describe('The deadline for the module.'),
      owner: z.string().describe('The owner of the module.'),
      estimatedHours: z.number().describe('The estimated hours for the module.'),
    })
  ).describe('An array of modules for the project.'),
});

export type ModuleGeneratorOutput = z.infer<typeof ModuleGeneratorOutputSchema>;

export async function moduleGenerator(input: ModuleGeneratorInput): Promise<ModuleGeneratorOutput> {
  return moduleGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moduleGeneratorPrompt',
  input: {schema: ModuleGeneratorInputSchema},
  output: {schema: ModuleGeneratorOutputSchema},
  prompt: `You are a project manager who is responsible for breaking down projects into modules.

You will be given a project description and you will need to break it down into modules.
For each module, provide a name, description, deadline, owner, and estimated hours.

Project Description: {{{projectDescription}}}

Output:
${JSON.stringify(ModuleGeneratorOutputSchema.shape, null, 2)}`,
});

const moduleGeneratorFlow = ai.defineFlow(
  {
    name: 'moduleGeneratorFlow',
    inputSchema: ModuleGeneratorInputSchema,
    outputSchema: ModuleGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
