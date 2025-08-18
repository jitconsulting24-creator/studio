
import type { Project } from './definitions';

export const DUMMY_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with a modern UI.',
    status: 'En Progreso',
    startDate: new Date('2023-01-15'),
    deadline: new Date('2024-08-30'),
    shareableLinkId: 'client-ecommerce-link-123',
    initialRequirements: [
      { id: 'req-1', title: 'User Authentication', url: 'https://example.com/doc/auth' },
      { id: 'req-2', title: 'Product Catalog API', url: 'https://example.com/doc/products' },
    ],
    projectDocuments: [
        { id: 'doc-1', name: 'Brief del Proyecto', url: '#', type: 'Brief' },
        { id: 'doc-2', name: 'Observaciones Iniciales', url: '#', type: 'Observaciones' },
    ],
    modules: [
      {
        id: 'mod1',
        name: 'User Authentication',
        description: 'Módulo para la autenticación de usuarios y gestión de perfiles.',
        status: 'Completado',
        deadline: new Date('2023-03-01'),
        parts: [{ name: 'Frontend Login UI', status: 'Completado', id: 'part-1' }],
        stages: [{ name: 'API Endpoints', status: 'Completado' }],
        requirements: [{ description: 'OAuth 2.0 support', status: 'Completado' }],
        reviews: [{ notes: 'Approved by stakeholder', status: 'Completado' }],
        owner: 'Admin',
        estimatedHours: 40,
        deliverables: [],
        documents: []
      },
      {
        id: 'mod2',
        name: 'Product Catalog',
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
      { eventDescription: 'Project Kick-off', eventDate: new Date('2023-01-15'), actor: 'admin' },
      { eventDescription: 'Module "User Authentication" completed', eventDate: new Date('2023-03-01'), actor: 'sistema' },
    ],
    changeRequests: [
        {
            id: 'cr1',
            requestDetails: 'Add support for dark mode in the client portal.',
            status: 'Pendiente de Aprobación',
            submittedAt: new Date('2024-04-10'),
        }
    ],
  },
  {
    id: '2',
    name: 'Mobile Banking App',
    description: 'A native mobile app for iOS and Android for banking services.',
    status: 'Planificación',
    startDate: new Date('2024-03-01'),
    deadline: new Date('2025-02-28'),
    shareableLinkId: 'client-banking-app-456',
    initialRequirements: [],
    projectDocuments: [],
    modules: [],
    timelineEvents: [],
    changeRequests: [],
  },
  {
    id: '3',
    name: 'Internal CRM Dashboard',
    description: 'A web-based dashboard for managing customer relationships.',
    status: 'En Revisión',
    startDate: new Date('2022-11-01'),
    deadline: new Date('2024-06-15'),
    shareableLinkId: 'client-crm-dash-789',
    initialRequirements: [],
    projectDocuments: [],
    modules: [
        {
            id: 'mod3',
            name: 'Contact Management',
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
            name: 'Reporting Engine',
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
    timelineEvents: [],
    changeRequests: [],
  },
];
