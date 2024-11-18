import {
	Cog,
	FileText,
	GalleryHorizontal,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	Music
} from 'lucide-svelte';

type Route = {
	label: string;
	icon: typeof LayoutDashboard;
	href: string;
	color: string;
	background_color?: string;
	otherStyles?: string;
	status?: string;
	description?: string;
	pro_description?: string;
};

const routes: Route[] = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/chat",
    color: "text-violet-500",
    background_color: "bg-violet-100 dark:bg-violet-500/20",
    description: "Chat with AI",
    pro_description: "Unlimited",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    background_color: "bg-pink-100 dark:bg-pink-500/20",
    description: "Generate stunning images with AI",
    pro_description: "30 Images per month",
  },
  {
    label: "Settings",
    icon: Cog,
    href: "/settings",
    color: "text-red-700",
    background_color: "bg-red-100 dark:bg-red-500/20",
    otherStyles: "animate-spin",
  },
];

export function getRoutes(excludedRoutes: string[] = []) {
	if (!excludedRoutes.length) return routes;
	return routes.filter((route) => !excludedRoutes.includes(route.href));
}
