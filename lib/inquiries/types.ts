export const projectTypes = [
  { value: 'tvc', label: 'TVC / Reklama wideo' },
  { value: 'print', label: 'Sesja zdjęciowa / Print' },
] as const

export const subjects = [
  { value: 'tola', label: 'Tola' },
  { value: 'milo', label: 'Milo' },
  { value: 'together', label: 'Dwoje razem' },
  { value: 'withParents', label: 'Dwójka z rodzicami' },
] as const

export type ProjectType = (typeof projectTypes)[number]['value']
export type InquirySubject = (typeof subjects)[number]['value']

export type Inquiry = {
  id: string
  createdAt: string
  subject: InquirySubject
  name: string
  company: string
  email: string
  phone: string
  projects: ProjectType[]
  projectLabel: string
  message: string
}

export function projectLabelFor(projects: string[]) {
  return projects
    .map((project) => projectTypes.find((item) => item.value === project)?.label ?? project)
    .join(', ')
}

export function subjectLabel(subject: InquirySubject) {
  return subjects.find((item) => item.value === subject)?.label ?? subject
}
