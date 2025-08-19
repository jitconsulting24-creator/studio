'use server';

import { revalidatePath } from 'next/cache';
import { DUMMY_PROJECTS, DUMMY_LEADS, DUMMY_CLIENT_REQUIREMENTS } from './data';
import type { ChangeRequest, ChangeRequestStatus, Document, Lead, Module, Part, Project, Requirement, TimelineEvent } from './definitions';
import { redirect } from 'next/navigation';

// --- PROJECT ACTIONS ---

export async function addProject(projectData: Omit<Project, 'id' | 'shareableLinkId' | 'modules' | 'timelineEvents' | 'changeRequests' | 'initialRequirements' | 'projectDocuments'>) {
    const newProject: Project = {
        ...projectData,
        id: `proj-${Date.now()}`,
        shareableLinkId: `client-link-${Date.now()}`,
        modules: [],
        timelineEvents: [{
            actor: 'sistema',
            eventDate: new Date(),
            eventDescription: `Proyecto "${projectData.name}" creado.`
        }],
        changeRequests: [],
        initialRequirements: [],
        projectDocuments: [],
    };
    
    DUMMY_PROJECTS.push(newProject);
    revalidatePath('/dashboard');
    return { success: true, project: newProject };
}


// --- MODULE ACTIONS ---

export async function addModule(projectId: string, moduleData: Omit<Module, 'id' | 'parts' | 'stages' | 'requirements' | 'reviews' | 'deliverables' | 'documents'>) {
    const project = DUMMY_PROJECTS.find(p => p.id === projectId);
    if (!project) return { error: 'Proyecto no encontrado.' };

    const newModule: Module = {
        ...moduleData,
        id: `mod-${Date.now()}`,
        status: 'Pendiente',
        parts: [],
        stages: [],
        requirements: [],
        reviews: [],
        deliverables: [],
        documents: [],
    };
    
    project.modules.push(newModule);
    project.timelineEvents.unshift({
        eventDescription: `Nuevo módulo añadido: "${newModule.name}"`,
        eventDate: new Date(),
        actor: 'admin'
    });

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, module: newModule };
}

export async function addModulesFromAI(projectId: string, newModules: Omit<Module, 'id' | 'parts' | 'stages' | 'requirements' | 'reviews' | 'deliverables' | 'documents'>[]) {
    const project = DUMMY_PROJECTS.find(p => p.id === projectId);
    if (!project) return { error: 'Proyecto no encontrado.' };
    
    const modulesToAdd: Module[] = newModules.map(m => ({
        ...m,
        id: `mod-${Date.now()}-${Math.random()}`,
        status: 'Pendiente',
        parts: [],
        stages: [],
        requirements: [],
        reviews: [],
        deliverables: [],
        documents: [],
    }));

    project.modules.push(...modulesToAdd);
    project.timelineEvents.unshift({
        eventDescription: `${modulesToAdd.length} módulos generados por IA`,
        eventDate: new Date(),
        actor: 'sistema'
    });

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, modules: modulesToAdd };
}

export async function editModule(projectId: string, updatedModule: Module) {
    const project = DUMMY_PROJECTS.find(p => p.id === projectId);
    if (!project) return { error: 'Proyecto no encontrado.' };

    project.modules = project.modules.map(m => m.id === updatedModule.id ? updatedModule : m);
    project.timelineEvents.unshift({
        eventDescription: `Módulo actualizado: "${updatedModule.name}"`,
        eventDate: new Date(),
        actor: 'admin'
    });

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, module: updatedModule };
}

export async function deleteModule(projectId: string, moduleId: string) {
    const project = DUMMY_PROJECTS.find(p => p.id === projectId);
    if (!project) return { error: 'Proyecto no encontrado.' };

    const moduleName = project.modules.find(m => m.id === moduleId)?.name || 'Desconocido';
    project.modules = project.modules.filter(m => m.id !== moduleId);
    project.timelineEvents.unshift({
        eventDescription: `Módulo eliminado: "${moduleName}"`,
        eventDate: new Date(),
        actor: 'admin'
    });
    
    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
}

export async function updateModuleParts(projectId: string, moduleId: string, updatedParts: Part[]) {
    const project = DUMMY_PROJECTS.find(p => p.id === projectId);
    if (!project) return { error: 'Proyecto no encontrado.' };

    const module = project.modules.find(m => m.id === moduleId);
    if (!module) return { error: 'Módulo no encontrado.' };
    
    module.parts = updatedParts;

    project.timelineEvents.unshift({
        eventDescription: `Tareas actualizadas para el módulo "${module.name}"`,
        eventDate: new Date(),
        actor: 'admin'
    });

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
}

// --- CHANGE REQUEST ACTIONS ---

export async function addChangeRequest(projectId: string, formData: FormData) {
  const requestDetails = formData.get('requestDetails') as string;

  if (!requestDetails) {
    return { error: 'Los detalles de la solicitud son obligatorios.' };
  }

  const project = DUMMY_PROJECTS.find(p => p.id === projectId);

  if (project) {
      const newRequest: ChangeRequest = {
          id: `cr-${Date.now()}`,
          requestDetails,
          status: 'Pendiente de Aprobación',
          submittedAt: new Date(),
      };
      project.changeRequests.push(newRequest);
      
      const timelineEvent = {
          eventDescription: `El cliente ha enviado una nueva solicitud de cambio.`,
          eventDate: new Date(),
          actor: 'cliente' as const
      };
      project.timelineEvents.unshift(timelineEvent);

      revalidatePath(`/client-view/${project.shareableLinkId}`);
      revalidatePath(`/dashboard/projects/${projectId}`);
  } else {
    return { error: 'Proyecto no encontrado.' };
  }

  return { success: 'Solicitud de cambio enviada con éxito.' };
}

export async function updateChangeRequestStatus(projectId: string, requestId: string, status: ChangeRequestStatus) {
    const project = DUMMY_PROJECTS.find(p => p.id === projectId);
    if (!project) return { error: 'Proyecto no encontrado.' };

    const request = project.changeRequests.find(r => r.id === requestId);
    if (!request) return { error: 'Solicitud no encontrada.' };

    request.status = status;
    project.timelineEvents.unshift({
        eventDescription: `Solicitud de cambio #${requestId.slice(-4)} ha sido ${status.toLowerCase()}`,
        eventDate: new Date(),
        actor: 'admin'
    });
    
    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
}


// --- REQUIREMENT ACTIONS ---

export async function addRequirement(projectId: string, requirementData: Omit<Requirement, 'id'>) {
    const project = DUMMY_PROJECTS.find(p => p.id === projectId);
    if (!project) return { error: 'Proyecto no encontrado.' };

    const newRequirement: Requirement = {
        ...requirementData,
        id: `req-${Date.now()}`,
    };

    project.initialRequirements.push(newRequirement);
    project.timelineEvents.unshift({
        eventDescription: `Nuevo requisito añadido: "${newRequirement.title}"`,
        eventDate: new Date(),
        actor: 'admin'
    });

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, requirement: newRequirement };
}

export async function editRequirement(projectId: string, updatedRequirement: Requirement) {
    const project = DUMMY_PROJECTS.find(p => p.id === projectId);
    if (!project) return { error: 'Proyecto no encontrado.' };

    project.initialRequirements = project.initialRequirements.map(r => r.id === updatedRequirement.id ? updatedRequirement : r);
    project.timelineEvents.unshift({
        eventDescription: `Requisito actualizado: "${updatedRequirement.title}"`,
        eventDate: new Date(),
        actor: 'admin'
    });
    
    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, requirement: updatedRequirement };
}

export async function deleteRequirement(projectId: string, requirementId: string) {
    const project = DUMMY_PROJECTS.find(p => p.id === projectId);
if (!project) return { error: 'Proyecto no encontrado.' };

    const requirementTitle = project.initialRequirements.find(r => r.id === requirementId)?.title || 'Desconocido';
    project.initialRequirements = project.initialRequirements.filter(r => r.id !== requirementId);

    project.timelineEvents.unshift({
        eventDescription: `Requisito eliminado: "${requirementTitle}"`,
        eventDate: new Date(),
        actor: 'admin'
    });
    
    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
}

// --- DOCUMENT ACTIONS ---

export async function addDocument(projectId: string, documentData: Omit<Document, 'id'>) {
    const project = DUMMY_PROJECTS.find(p => p.id === projectId);
    if (!project) return { error: 'Proyecto no encontrado.' };

    const newDocument: Document = {
        ...documentData,
        id: `doc-${Date.now()}`,
    };

    if (!project.projectDocuments) {
        project.projectDocuments = [];
    }

    project.projectDocuments.push(newDocument);
    project.timelineEvents.unshift({
        eventDescription: `Nuevo documento de proyecto añadido: "${newDocument.name}"`,
        eventDate: new Date(),
        actor: 'admin'
    });

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, document: newDocument };
}

// --- LEAD ACTIONS ---

export async function createLead() {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: 'Nuevo Lead',
      email: `lead${DUMMY_LEADS.length + 1}@example.com`,
      company: 'Empresa Pendiente',
      status: 'Nuevo',
      createdAt: new Date(),
      formLink: `/leads/lead-${Date.now()}/form`,
    };
    DUMMY_LEADS.unshift(newLead);
    revalidatePath('/dashboard/leads');
    return { success: true, lead: newLead };
}

export async function submitLeadForm(leadId: string, formData: any) {
    const lead = DUMMY_LEADS.find(l => l.id === leadId);
    if (lead) {
        lead.status = 'Propuesta Enviada';
        lead.name = formData.contactInfo.name;
        lead.company = formData.contactInfo.company;
        lead.email = formData.contactInfo.email;

        DUMMY_CLIENT_REQUIREMENTS.push({
            leadId,
            submittedAt: new Date(),
            ...formData,
        });
        revalidatePath('/dashboard/leads');
    } else {
        return { error: 'Lead no encontrado' };
    }

    return { success: true };
}