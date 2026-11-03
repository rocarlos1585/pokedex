export const colors = {
    background: '#FFFBEF',
    surface: '#FFFFFF',
    ink: '#1A1A1A',
    textMuted: '#5C5C5C',
    accent: '#D7F94B',
    cardBackdrop: '#FFEFC7',
    cardBackdropShape: '#FFE09A',
    statTrack: '#F3EEDD',
    statFill: '#FFD43B',
    cacheWarning: '#FFB020',
  } as const;
  
  export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 32,
  } as const;
  
  export const radius = {
    sm: 8,
    md: 12,
    lg: 18,
    xl: 22,
    pill: 999,
  } as const;
  
  export const border = {
    width: 2.5,
    thinWidth: 2,
  } as const;
  
  export const shadow = {
    offset: 4,
    smallOffset: 3,
  } as const;
  
  export const typography = {
    title: { fontSize: 32, fontWeight: '800' },
    heading: { fontSize: 24, fontWeight: '800' },
    subheading: { fontSize: 15, fontWeight: '700' },
    body: { fontSize: 14, fontWeight: '400' },
    label: { fontSize: 12, fontWeight: '600' },
  } as const;