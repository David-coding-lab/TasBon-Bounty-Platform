// Shared status → style map. Add a new status here and every table
// (My Applications, Manage Applicants) picks it up automatically.
export const statusConfig = {
  'Pending Review': {
    bg: 'bg-[#FEF3C6]',
    text: 'text-[#BB4D00]',
    dot: 'bg-[#F59E0B]',
  },
  'In Progress': {
    bg: 'bg-[#DBEAFE]',
    text: 'text-[#1447E6]',
    dot: 'bg-[#3B82F6]',
  },
  'In Review': {
    bg: 'bg-[#EDE9FE]',
    text: 'text-[#6D28D9]',
    dot: 'bg-[#8B5CF6]',
  },
  Completed: {
    bg: 'bg-[#D0FAE5]',
    text: 'text-[#007A55]',
    dot: 'bg-[#009966]',
  },
  'Not Selected': {
    bg: 'bg-[#FFE2E2]',
    text: 'text-[#C10007]',
    dot: 'bg-[#EF4444]',
  },
  // Used on the "Manage Applicants" side, kept visually aligned with
  // the equivalent applicant-facing statuses above (Completed / Not Selected).
  Selected: {
    bg: 'bg-[#D0FAE5]',
    text: 'text-[#007A55]',
    dot: 'bg-[#009966]',
  },
  Removed: {
    bg: 'bg-[#FFE2E2]',
    text: 'text-[#C10007]',
    dot: 'bg-[#EF4444]',
  },
}

export const defaultStatus = 'Pending Review'
