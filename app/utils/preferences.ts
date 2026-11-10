export const preferenceDefaults = {
  sidebar: true,
  toc: false,
  collapsed: false,
  splitter: false,
  surround: true
}

export type Preferences = Partial<typeof preferenceDefaults>

export const preferenceChoices = {
  locale: ['en', 'fi'],
  colorMode: ['light', 'dark', 'system']
} as const

export type ChoiceKey = keyof typeof preferenceChoices
export type ColorModePreference = (typeof preferenceChoices.colorMode)[number]
export type LocaleCode = (typeof preferenceChoices.locale)[number]

export function toYaml(data: Record<string, unknown>) {
  return Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n') + '\n'
}

export function fromYaml(text: string) {
  const preferences: Record<string, boolean> = {}
  const choices: Partial<Record<ChoiceKey, string>> = {}

  for (const line of text.split('\n')) {
    const [, key, value] = line.match(/^(\w+):\s*(\S+)\s*$/) ?? []
    if (!key || !value) continue

    if (key in preferenceDefaults && (value === 'true' || value === 'false')) {
      preferences[key] = value === 'true'
    } else if (key in preferenceChoices) {
      const allowed: readonly string[] = preferenceChoices[key as ChoiceKey]
      if (allowed.includes(value)) choices[key as ChoiceKey] = value
    }
  }

  return { preferences: preferences as Preferences, choices }
}
