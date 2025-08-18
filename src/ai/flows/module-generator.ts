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
  projectDescription: z.string().describe('La descripción del proyecto.'),
});
export type ModuleGeneratorInput = z.infer<typeof ModuleGeneratorInputSchema>;

const ModuleGeneratorOutputSchema = z.object({
  modules: z.array(
    z.object({
      name: z.string().describe('El nombre del módulo.'),
      description: z.string().describe('La descripción del módulo.'),
      deadline: z.string().describe('La fecha límite para el módulo en formato AAAA-MM-DD.'),
      owner: z.string().describe('El responsable del módulo.'),
      estimatedHours: z.number().describe('Las horas estimadas para el módulo.'),
    })
  ).describe('Un array de módulos para el proyecto.'),
});

export type ModuleGeneratorOutput = z.infer<typeof ModuleGeneratorOutputSchema>;

export async function moduleGenerator(input: ModuleGeneratorInput): Promise<ModuleGeneratorOutput> {
  return moduleGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moduleGeneratorPrompt',
  input: {schema: ModuleGeneratorInputSchema},
  output: {schema: ModuleGeneratorOutputSchema},
  prompt: `Eres un jefe de proyecto responsable de desglosar proyectos en módulos.

Se te dará una descripción del proyecto y tendrás que desglosarla en módulos.
Para cada módulo, proporciona un nombre, descripción, fecha límite, responsable y horas estimadas.
El responsable debe ser una persona o un rol genérico (p. ej., 'Equipo de Frontend', 'Admin').
La fecha límite debe estar en el futuro y en formato AAAA-MM-DD.

Descripción del Proyecto: {{{projectDescription}}}`,
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
