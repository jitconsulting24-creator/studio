'use server';

import { revalidatePath } from 'next/cache';

export async function addChangeRequest(
  projectId: string,
  formData: FormData
) {
  const requestDetails = formData.get('requestDetails') as string;

  if (!requestDetails) {
    return { error: 'Request details are required.' };
  }

  console.log('New Change Request for project', projectId);
  console.log({ requestDetails });
  
  // Here you would typically interact with your database
  // For now, we just log the data and revalidate the path
  
  revalidatePath(`/client-view/[shareableLinkId]`); // Use the correct linkId
  revalidatePath(`/dashboard/projects/${projectId}`);

  return { success: 'Change request submitted successfully.' };
}
