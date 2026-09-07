export const projectTypes = [
  { value: 'tvc', label: 'TVC / Reklama wideo' },
  { value: 'print', label: 'Sesja zdjęciowa / Print' },
  { value: 'duo', label: 'Projekt w duecie z rodzeństwem' },
] as const

export type ProjectType = (typeof projectTypes)[number]['value']
export type InquiryModel = 'tola' | 'milo' | 'family'

export type Inquiry = {
  id: string
  createdAt: string
  model: InquiryModel
  name: string
  company: string
  email: string
  phone: string
  project: ProjectType
  projectLabel: string
  message: string
}

export function projectLabelFor(project: string, model: InquiryModel) {
  if (project === 'duo') {
    if (model === 'tola') return 'Projekt w duecie z bratem'
    if (model === 'milo') return 'Projekt w duecie z siostrą'
    return 'Projekt w duecie Tola + Milo'
  }
  return projectTypes.find((item) => item.value === project)?.label ?? project
}

export function modelLabel(model: InquiryModel) {
  if (model === 'tola') return 'Tola Lieske'
  if (model === 'milo') return 'Milo Lieske'
  return 'Tola & Milo Lieske'
}
