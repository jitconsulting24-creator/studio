'use server';

import { revalidatePath } from 'next/cache';
import { DUMMY_PROJECTS } from './data';
import type { ChangeRequest } from './definitions';

export async function addChangeRequest(
  projectId: string,
  formData: FormData
) {
  const requestDetails = formData.get('requestDetails') as string;

  if (!requestDetails) {
    return { error: 'Request details are required.' };
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
          eventDescription: `Client submitted a new change request.`,
          eventDate: new Date(),
          actor: 'cliente' as const
      };
      project.timelineEvents.push(timelineEvent);

      revalidatePath(`/client-view/${project.shareableLinkId}`);
      revalidatePath(`/dashboard/projects/${projectId}`);
  } else {
    return { error: 'Project not found.' };
  }

  return { success: 'Change request submitted successfully.' };
}
