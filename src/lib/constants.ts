import { 
  MessageSquare, 
  BrainCircuit, 
  PackageCheck, 
  UserSquare2, 
  History, 
  TrendingUp,
  Package,
  Truck,
  Plane,
  Anchor,
  Mail,
  Globe,
  AtSign
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  isCompletedIcon?: boolean;
}

export interface ClientCompany {
  name: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features", icon: MessageSquare },
  { label: "How It Works", href: "#workflow", icon: History },
  { label: "Solutions", href: "#solutions", icon: PackageCheck },
  { label: "Contact", href: "#contact", icon: Mail },
];

export const FEATURES: FeatureItem[] = [
  {
    title: "WhatsApp Automation",
    description: "Drivers update operations directly from WhatsApp.",
    icon: MessageSquare,
  },
  {
    title: "AI Intent Detection",
    description: "AI understands delivery, delay, arrival, and",
    icon: BrainCircuit,
  },
  {
    title: "Shipment Management",
    description: "Track shipments from pickup to delivery.",
    icon: PackageCheck,
  },
  {
    title: "Driver Management",
    description: "Manage drivers, vehicles, and assignments.",
    icon: UserSquare2,
  },
  {
    title: "Timeline Tracking",
    description: "Every action is stored as an operational timeline event.",
    icon: History,
  },
  {
    title: "Analytics Dashboard",
    description: "Monitor shipments, delays, and fleet performance in real time.",
    icon: TrendingUp,
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: 1,
    title: "Driver texts WhatsApp",
    description: 'Drivers send a simple message: "Delivered Order #4521" or "Delayed 20m traffic". No training required.',
  },
  {
    stepNumber: 2,
    title: "AI recognizes intent",
    description: "Our Natural Language Processing (NLP) engine parses the text, extracts IDs, and identifies the action instantly.",
  },
  {
    stepNumber: 3,
    title: "ERP updates automatically",
    description: "The data is securely pushed to SAP, Oracle, or Microsoft Dynamics. Real-time visibility for all stakeholders.",
    isCompletedIcon: true,
  },
];

export const CLIENT_COMPANIES: ClientCompany[] = [
  { name: "GLOBALEX", icon: Package },
  { name: "TRUCKFLOW", icon: Truck },
  { name: "SKYFREIGHT", icon: Plane },
  { name: "SEALINK", icon: Anchor },
];

export const SOCIAL_LINKS = [
  { icon: AtSign, href: "mailto:info@nxgroup.com", label: "Email" },
  { icon: Globe, href: "https://nxgroup.com", label: "Website" },
];

export const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "WhatsApp Link", href: "#" },
      { label: "ERP Connectors", href: "#" },
      { label: "Fleet Insights", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "API Status", href: "#" },
      { label: "Trust Center", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
];
