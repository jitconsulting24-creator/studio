export type ProjectStatus = "Planificación" | "En Progreso" | "En Revisión" | "Completado";
export type ModuleStatus = "Pendiente" | "En Progreso" | "Completado";

export interface ChangeRequest {
  id: string;
  requestDetails: string;
  status: string;
  submittedAt: Date;
}

export interface TimelineEvent {
  eventDescription: string;
  eventDate: Date;
  actor: "admin" | "cliente" | "sistema";
}

export interface Module {
  id: string;
  name: string;
  status: ModuleStatus;
  deadline: Date;
  parts: { name: string; status: string }[];
  stages: { name: string; status: string }[];
  requirements: { description: string; status: string }[];
  reviews: { notes: string; status: string }[];
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
  modules: Module[];
  timelineEvents: TimelineEvent[];
  changeRequests: ChangeRequest[];
}
