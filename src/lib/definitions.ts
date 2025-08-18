
export type ProjectStatus = "Planificación" | "En Progreso" | "En Revisión" | "Completado";
export type ModuleStatus = "Pendiente" | "En Progreso" | "Completado";
export type ChangeRequestStatus = "Pendiente de Aprobación" | "Aprobado" | "Rechazado";
export type PartStatus = "Pendiente" | "Completado";

export interface Document {
  id: string;
  name: string;
  url: string;
  type: 'Brief' | 'Observaciones' | 'Acta de Reunión' | 'Otro';
}

export interface Deliverable {
    id: string;
    name: string;
    url: string;
    submittedDate: Date;
}

export interface ChangeRequest {
  id: string;
  requestDetails: string;
  status: ChangeRequestStatus;
  submittedAt: Date;
}

export interface TimelineEvent {
  eventDescription: string;
  eventDate: Date;
  actor: "admin" | "cliente" | "sistema";
}

export interface Part {
  id: string;
  name: string;
  status: PartStatus;
}


export interface Module {
  id: string;
  name: string;
  description?: string;
  status: ModuleStatus;
  deadline: Date;
  owner: string;
  estimatedHours: number;
  parts: Part[];
  stages: { name: string; status: string }[];
  requirements: { description: string; status: string }[];
  reviews: { notes: string; status: string }[];
  deliverables?: Deliverable[];
  documents?: Document[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: Date;
  deadline: Date;
  shareableLinkId: string;
  initialRequirements: { title: string; url: string }[];
  projectDocuments?: Document[];
  modules: Module[];
  timelineEvents: TimelineEvent[];
  changeRequests: ChangeRequest[];
}
