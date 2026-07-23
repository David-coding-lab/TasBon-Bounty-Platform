// STATIC / MOCK VERSION — no network calls yet.

let mockApplicants = [
  {
    id: 'a1',
    applicantName: 'Ada Nwosu',
    applicantHeadline: 'Frontend Engineer',
    avatar: '',
    bountyTitle: 'Build a landing page for launch',
    reward: '$500',
    status: 'Pending Review',
    appliedOn: 'Jul 10, 2026',
  },
  {
    id: 'a2',
    applicantName: 'Femi Okafor',
    applicantHeadline: 'Full-stack Developer',
    avatar: '',
    bountyTitle: 'Fix checkout bug on mobile',
    reward: '$150',
    status: 'Pending Review',
    appliedOn: 'Jul 9, 2026',
  },
  {
    id: 'a3',
    applicantName: 'Chidinma Eze',
    applicantHeadline: 'UI/UX Designer',
    avatar: '',
    bountyTitle: 'Build a landing page for launch',
    reward: '$500',
    status: 'Selected',
    appliedOn: 'Jul 5, 2026',
  },
  {
    id: 'a4',
    applicantName: 'Tunde Bakare',
    applicantHeadline: 'Backend Engineer',
    avatar: '',
    bountyTitle: 'Write API documentation',
    reward: '$100',
    status: 'Removed',
    appliedOn: 'Jul 2, 2026',
  },
]

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

// params: { status, search }
export const getBountyApplicants = async (params = {}) => {
  await delay()
  let results = [...mockApplicants]

  if (params.status) {
    results = results.filter((a) => a.status === params.status)
  }
  if (params.search) {
    const q = params.search.toLowerCase()
    results = results.filter(
      (a) =>
        a.applicantName.toLowerCase().includes(q) ||
        a.bountyTitle.toLowerCase().includes(q),
    )
  }

  return { applicants: results }
}

export const selectApplicant = async (applicationId) => {
  await delay(150)
  mockApplicants = mockApplicants.map((a) =>
    a.id === applicationId ? { ...a, status: 'Selected' } : a,
  )
  return { success: true }
}

export const removeApplicant = async (applicationId) => {
  await delay(150)
  mockApplicants = mockApplicants.map((a) =>
    a.id === applicationId ? { ...a, status: 'Removed' } : a,
  )
  return { success: true }
}

// --- replace the three functions above with
// something like this (matching whatever client services/applications.js uses):
//
// import apiClient from '../../../../services/apiClient'
//
// export const getBountyApplicants = (params = {}) =>
//   apiClient.get('/bounties/applicants', { params })
//
// export const selectApplicant = (applicationId) =>
//   apiClient.patch(`/bounties/applicants/${applicationId}`, { status: 'Selected' })
//
// export const removeApplicant = (applicationId) =>
//   apiClient.patch(`/bounties/applicants/${applicationId}`, { status: 'Removed' })
