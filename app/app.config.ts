export default defineAppConfig({
  ui: {
    colors: {
      primary: 'violet',
      secondary: 'indigo',
      neutral: 'olive',
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
