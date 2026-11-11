export default defineAppConfig({
  ui: {
    colors: {
      primary: 'suomi',
      secondary: 'lake',
      neutral: 'mist',
      success: 'emerald',
      info: 'sky',
      warning: 'amber',
      error: 'rose'
    },
    button: {
      defaultVariants: {
        variant: 'subtle'
      }
    },
    timeline: {
      slots: {
        date: 'text-primary text-xs'
      }
    }
  }
})
