
import type { Project, Lead, ClientRequirements } from './definitions';

export const DUMMY_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Plataforma de E-commerce',
    description: 'Una plataforma de comercio electrónico con todas las funciones y una interfaz de usuario moderna.',
    status: 'En Progreso',
    startDate: new Date('2023-01-15'),
    deadline: new Date('2024-08-30'),
    shareableLinkId: 'client-ecommerce-link-123',
    initialRequirements: [
      { id: 'req-1', title: 'Autenticación de Usuario', url: 'https://example.com/doc/auth' },
      { id: 'req-2', title: 'API del Catálogo de Productos', url: 'https://example.com/doc/products' },
    ],
    projectDocuments: [
        { id: 'doc-1', name: 'Brief del Proyecto', url: '#', type: 'Brief' },
        { id: 'doc-2', name: 'Observaciones Iniciales', url: '#', type: 'Observaciones' },
    ],
    modules: [
      {
        id: 'mod1',
        name: 'Autenticación de Usuario',
        description: 'Módulo para la autenticación de usuarios y gestión de perfiles.',
        status: 'Completado',
        deadline: new Date('2023-03-01'),
        parts: [{ name: 'UI de Login en Frontend', status: 'Completado', id: 'part-1' }],
        stages: [{ name: 'Endpoints de API', status: 'Completado' }],
        requirements: [{ description: 'Soporte para OAuth 2.0', status: 'Completado' }],
        reviews: [{ notes: 'Aprobado por el stakeholder', status: 'Completado' }],
        owner: 'Admin',
        estimatedHours: 40,
        deliverables: [],
        documents: []
      },
      {
        id: 'mod2',
        name: 'Catálogo de Productos',
        description: 'Módulo para la gestión del catálogo de productos.',
        status: 'En Progreso',
        deadline: new Date('2024-05-20'),
        parts: [],
        stages: [],
        requirements: [],
        reviews: [],
        owner: 'Admin',
        estimatedHours: 80,
        deliverables: [],
        documents: []
      },
    ],
    timelineEvents: [
      { eventDescription: 'Inicio del Proyecto', eventDate: new Date('2023-01-15'), actor: 'admin' },
      { eventDescription: 'Módulo "Autenticación de Usuario" completado', eventDate: new Date('2023-03-01'), actor: 'sistema' },
    ],
    changeRequests: [
        {
            id: 'cr1',
            requestDetails: 'Añadir soporte para modo oscuro en el portal del cliente.',
            status: 'Pendiente de Aprobación',
            submittedAt: new Date('2024-04-10'),
        }
    ],
  },
  {
    id: '2',
    name: 'App de Banca Móvil',
    description: 'Una app móvil nativa para iOS y Android para servicios bancarios.',
    status: 'Planificación',
    startDate: new Date('2024-03-01'),
    deadline: new Date('2025-02-28'),
    shareableLinkId: 'client-banking-app-456',
    initialRequirements: [],
    projectDocuments: [],
    modules: [],
    timelineEvents: [
       { eventDescription: 'Proyecto "App de Banca Móvil" creado.', eventDate: new Date(), actor: 'sistema' }
    ],
    changeRequests: [],
  },
  {
    id: '3',
    name: 'Dashboard CRM Interno',
    description: 'Un dashboard basado en web para la gestión de relaciones con clientes.',
    status: 'En Revisión',
    startDate: new Date('2022-11-01'),
    deadline: new Date('2024-06-15'),
    shareableLinkId: 'client-crm-dash-789',
    initialRequirements: [],
    projectDocuments: [],
    modules: [
        {
            id: 'mod3',
            name: 'Gestión de Contactos',
            description: 'Módulo para la gestión de contactos.',
            status: 'Completado',
            deadline: new Date('2023-02-15'),
            parts:[], stages: [], requirements:[], reviews:[],
            owner: 'Admin',
            estimatedHours: 60,
            deliverables: [],
            documents: []
        },
        {
            id: 'mod4',
            name: 'Motor de Informes',
            description: 'Módulo para el motor de informes.',
            status: 'En Revisión',
            deadline: new Date('2024-06-01'),
            parts:[], stages: [], requirements:[], reviews:[],
            owner: 'Admin',
            estimatedHours: 120,
            deliverables: [],
            documents: []
        }
    ],
    timelineEvents: [
        { eventDescription: 'Proyecto "Dashboard CRM Interno" creado.', eventDate: new Date(), actor: 'sistema' }
    ],
    changeRequests: [],
  },
];

export const DUMMY_LEADS: Lead[] = [
    {
        id: 'lead-1',
        name: 'Ana Pérez',
        email: 'ana.perez@example.com',
        company: 'Tech Solutions',
        status: 'Nuevo',
        createdAt: new Date('2024-05-01'),
        formLink: '/leads/lead-1/form'
    },
    {
        id: 'lead-2',
        name: 'Carlos Gómez',
        email: 'carlos.gomez@example.com',
        company: 'Innovate Corp',
        status: 'Contactado',
        createdAt: new Date('2024-05-05'),
        formLink: '/leads/lead-2/form'
    }
];

export const DUMMY_CLIENT_REQUIREMENTS: ClientRequirements[] = [];
