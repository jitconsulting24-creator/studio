
import type { Project, Lead, ClientRequirements } from './definitions';
import { promises as fs } from 'fs';
import path from 'path';

// Helper to get the full path to a data file
const dataFilePath = (filename: string) => path.join(process.cwd(), 'src', 'data', filename);

// Generic function to read data from a JSON file
async function readData<T>(filename: string): Promise<T[]> {
  try {
    const jsonString = await fs.readFile(dataFilePath(filename), 'utf-8');
    // Ensure dates are parsed correctly
    return JSON.parse(jsonString, (key, value) => {
      if (key.endsWith('Date') || key.endsWith('At')) {
        return new Date(value);
      }
      return value;
    }) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []; // Return an empty array if the file doesn't exist
    }
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
}

// --- Data Fetching Functions ---

export async function getProjects(): Promise<Project[]> {
  return await readData<Project>('projects.json');
}

export async function getLeads(): Promise<Lead[]> {
  return await readData<Lead>('leads.json');
}

export async function getClientRequirements(): Promise<ClientRequirements[]> {
  return await readData<ClientRequirements>('client-requirements.json');
}

export async function getProjectById(projectId: string): Promise<Project | undefined> {
    const projects = await getProjects();
    return projects.find(p => p.id === projectId);
}

export async function getLeadById(leadId: string): Promise<Lead | undefined> {
    const leads = await getLeads();
    return leads.find(l => l.id === leadId);
}

export async function getRequirementsByLeadId(leadId: string): Promise<ClientRequirements | undefined> {
    const requirements = await getClientRequirements();
    return requirements.find(r => r.leadId === leadId);
}
