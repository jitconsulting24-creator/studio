
'use client';
import { useState } from 'react';
import type { Project, Module, ChangeRequestStatus, TimelineEvent, Part, Requirement, Document } from '@/lib/definitions';
import ProjectHeader from './project-header';
import RequirementsCard from './requirements-card';
import ModulesAccordion from './modules-accordion';
import TimelineView from './timeline-view';
import ChangeRequestsList from './change-requests-list';
import { useToast } from '@/hooks/use-toast';
import ProjectDocumentsCard from './project-documents-card';

export default function ProjectDetailsClientPage({ initialProject }: { initialProject: Project }) {
  const [project, setProject] = useState(initialProject);
  const { toast } = useToast();

  const addTimelineEvent = (eventDescription: string, actor: TimelineEvent['actor']) => {
    const newEvent: TimelineEvent = {
        eventDescription,
        eventDate: new Date(),
        actor,
    };
    setProject(prev => ({ ...prev, timelineEvents: [newEvent, ...prev.timelineEvents] }));
  };

  const handleAddModule = (newModuleData: Omit<Module, 'id' | 'parts' | 'stages' | 'requirements' | 'reviews' | 'deliverables' | 'documents'>) => {
    const newModule: Module = {
        ...newModuleData,
        id: `mod-${Date.now()}`,
        status: 'Pendiente',
        parts: [],
        stages: [],
        requirements: [],
        reviews: [],
        deliverables: [],
        documents: [],
    };
    setProject(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
    addTimelineEvent(`Nuevo módulo añadido: "${newModule.name}"`, 'admin');
     toast({
      title: 'Módulo Añadido',
      description: `El módulo "${newModule.name}" ha sido añadido al proyecto.`,
    });
  };

  const handleEditModule = (updatedModule: Module) => {
    setProject(prev => ({
      ...prev,
      modules: prev.modules.map(m => m.id === updatedModule.id ? updatedModule : m)
    }));
    addTimelineEvent(`Módulo actualizado: "${updatedModule.name}"`, 'admin');
    toast({
      title: 'Módulo Actualizado',
      description: `El módulo "${updatedModule.name}" ha sido actualizado.`,
    });
  };

  const handleAddModulesFromAI = (newModules: Omit<Module, 'id' | 'parts' | 'stages' | 'requirements' | 'reviews' | 'deliverables' | 'documents'>[]) => {
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

      setProject(prev => ({...prev, modules: [...prev.modules, ...modulesToAdd]}));
      addTimelineEvent(`${modulesToAdd.length} módulos generados por IA`, 'sistema');
      toast({
        title: 'Módulos de IA Añadidos',
        description: `${modulesToAdd.length} nuevos módulos han sido añadidos al proyecto.`,
      });
  }

  const handleDeleteModule = (moduleId: string) => {
    const moduleName = project.modules.find(m => m.id === moduleId)?.name || 'Desconocido';
    setProject(prev => ({
        ...prev,
        modules: prev.modules.filter(m => m.id !== moduleId)
    }));
    addTimelineEvent(`Módulo eliminado: "${moduleName}"`, 'admin');
    toast({
        variant: 'destructive',
        title: 'Módulo Eliminado',
        description: `El módulo "${moduleName}" ha sido eliminado.`,
    });
  }

  const handleChangeRequestStatus = (requestId: string, status: ChangeRequestStatus) => {
    setProject(prev => ({
      ...prev,
      changeRequests: prev.changeRequests.map(req => 
        req.id === requestId ? { ...req, status } : req
      )
    }));
    addTimelineEvent(`Solicitud de cambio ${requestId} ha sido ${status.toLowerCase()}`, 'admin');
    toast({
        title: `Solicitud ${status}`,
        description: `La solicitud de cambio ha sido marcada como ${status.toLowerCase()}.`
    });
  };

  const handleModulePartsUpdate = (moduleId: string, updatedParts: Part[]) => {
    setProject(prev => ({
      ...prev,
      modules: prev.modules.map(m => 
        m.id === moduleId ? { ...m, parts: updatedParts } : m
      )
    }));
    addTimelineEvent(`Tareas actualizadas para el módulo "${project.modules.find(m => m.id === moduleId)?.name}"`, 'admin');
    toast({
        title: 'Tareas Actualizadas',
        description: 'La lista de tareas ha sido actualizada.'
    });
  };

  const handleAddRequirement = (requirementData: Omit<Requirement, 'id'>) => {
    const newRequirement: Requirement = {
      ...requirementData,
      id: `req-${Date.now()}`,
    };
    setProject(prev => ({ ...prev, initialRequirements: [...prev.initialRequirements, newRequirement]}));
    addTimelineEvent(`Nuevo requisito añadido: "${newRequirement.title}"`, 'admin');
    toast({
      title: 'Requisito Añadido',
      description: 'Se ha añadido un nuevo requisito inicial al proyecto.',
    });
  };

  const handleEditRequirement = (updatedRequirement: Requirement) => {
    setProject(prev => ({
      ...prev,
      initialRequirements: prev.initialRequirements.map(r => r.id === updatedRequirement.id ? updatedRequirement : r),
    }));
    addTimelineEvent(`Requisito actualizado: "${updatedRequirement.title}"`, 'admin');
    toast({
      title: 'Requisito Actualizado',
      description: 'El requisito ha sido actualizado.',
    });
  };

  const handleDeleteRequirement = (requirementId: string) => {
    const requirementTitle = project.initialRequirements.find(r => r.id === requirementId)?.title || 'Desconocido';
    setProject(prev => ({
      ...prev,
      initialRequirements: prev.initialRequirements.filter(r => r.id !== requirementId),
    }));
    addTimelineEvent(`Requisito eliminado: "${requirementTitle}"`, 'admin');
    toast({
      variant: 'destructive',
      title: 'Requisito Eliminado',
      description: 'El requisito ha sido eliminado.',
    });
  };

  const handleAddDocument = (documentData: Omit<Document, 'id'>) => {
    const newDocument: Document = {
      ...documentData,
      id: `doc-${Date.now()}`,
    };
    setProject(prev => ({ ...prev, projectDocuments: [...(prev.projectDocuments || []), newDocument] }));
    addTimelineEvent(`Nuevo documento de proyecto añadido: "${newDocument.name}"`, 'admin');
    toast({
      title: 'Documento Añadido',
      description: 'Se ha añadido un nuevo documento al proyecto.',
    });
  };

  return (
    <div className="space-y-8">
      <ProjectHeader project={project} />
      
      <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-2 space-y-8">
          <ModulesAccordion 
            modules={project.modules} 
            onAddModule={handleAddModule}
            onEditModule={handleEditModule}
            onDeleteModule={handleDeleteModule}
            onModulePartsUpdate={handleModulePartsUpdate}
           />
          <TimelineView events={project.timelineEvents} />
        </div>

        <div className="space-y-8">
          <ProjectDocumentsCard 
            documents={project.projectDocuments || []} 
            onAddDocument={handleAddDocument}
            />
          <RequirementsCard 
            requirements={project.initialRequirements} 
            onAddModules={handleAddModulesFromAI}
            projectDescription={project.description}
            onAddRequirement={handleAddRequirement}
            onEditRequirement={handleEditRequirement}
            onDeleteRequirement={handleDeleteRequirement}
          />
          <ChangeRequestsList 
            requests={project.changeRequests} 
            onChangeRequestStatus={handleChangeRequestStatus}
          />
        </div>
      </div>
    </div>
  );
}
