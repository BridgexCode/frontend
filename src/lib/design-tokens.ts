/**
 * Design Tokens extracted from LogisticsPro Stitch template.
 * Maps theme colors, spacings, typography, and border radiuses.
 */

export const DESIGN_TOKENS = {
  colors: {
    primary: "#000000",
    onPrimary: "#ffffff",
    secondary: "#006e2f", // Brand WhatsApp Green
    onSecondary: "#ffffff",
    secondaryFixed: "#6bff8f",
    secondaryFixedDim: "#4ae176",
    onSecondaryFixed: "#002109",
    onSecondaryFixedVariant: "#005321",
    secondaryContainer: "#6bff8f",
    onSecondaryContainer: "#007432",
    
    background: "#f7f9fb",
    onBackground: "#191c1e",
    
    surface: "#f7f9fb",
    onSurface: "#191c1e",
    surfaceVariant: "#e0e3e5",
    onSurfaceVariant: "#45464d",
    surfaceBright: "#f7f9fb",
    surfaceDim: "#d8dadc",
    surfaceTint: "#565e74",
    
    // Surface Container Levels
    surfaceContainerLowest: "#ffffff",
    surfaceContainerLow: "#f2f4f6",
    surfaceContainer: "#eceef0",
    surfaceContainerHigh: "#e6e8ea",
    surfaceContainerHighest: "#e0e3e5",
    
    inverseSurface: "#2d3133",
    inverseOnSurface: "#eff1f3",
    inversePrimary: "#bec6e0",
    
    outline: "#76777d",
    outlineVariant: "#c6c6cd",
    
    primaryFixed: "#dae2fd",
    primaryFixedDim: "#bec6e0",
    onPrimaryFixed: "#131b2e",
    onPrimaryFixedVariant: "#3f465c",
    primaryContainer: "#131b2e",
    onPrimaryContainer: "#7c839b",
    
    tertiary: "#000000",
    onTertiary: "#ffffff",
    tertiaryFixed: "#d3e4fe",
    tertiaryFixedDim: "#b7c8e1",
    onTertiaryFixed: "#0b1c30",
    onTertiaryFixedVariant: "#38485d",
    tertiaryContainer: "#0b1c30",
    onTertiaryContainer: "#75859d",
    
    error: "#ba1a1a",
    onError: "#ffffff",
    errorContainer: "#ffdad6",
    onErrorContainer: "#93000a",
  },
  
  borderRadius: {
    DEFAULT: "8px",
    lg: "8px",
    xl: "12px",
    full: "9999px",
  },
  
  spacing: {
    base: "4px",
    xs: "4px",
    sm: "8px",
    md: "16px",
    gutter: "16px",
    lg: "24px",
    xl: "32px",
    containerMarginMobile: "16px",
    containerMarginDesktop: "40px",
  },
  
  fonts: {
    titleMd: "Plus Jakarta Sans, sans-serif",
    bodyLg: "Inter, sans-serif",
    bodyMd: "Inter, sans-serif",
    headlineLg: "Plus Jakarta Sans, sans-serif",
    headlineXl: "Plus Jakarta Sans, sans-serif",
    headlineLgMobile: "Plus Jakarta Sans, sans-serif",
    labelSm: "JetBrains Mono, monospace",
    labelXs: "JetBrains Mono, monospace",
  },
  
  fontSize: {
    titleMd: { fontSize: "18px", lineHeight: "24px", fontWeight: "600" },
    bodyLg: { fontSize: "16px", lineHeight: "24px", fontWeight: "400" },
    bodyMd: { fontSize: "14px", lineHeight: "20px", fontWeight: "400" },
    headlineLg: { fontSize: "24px", lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "700" },
    headlineXl: { fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "700" },
    headlineLgMobile: { fontSize: "20px", lineHeight: "28px", fontWeight: "700" },
    labelSm: { fontSize: "12px", lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "500" },
    labelXs: { fontSize: "10px", lineHeight: "14px", fontWeight: "600" },
  }
} as const;
