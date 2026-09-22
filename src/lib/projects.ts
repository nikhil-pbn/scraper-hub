import { projects } from "@/data/projects";
import type { Project } from "@/lib/types";

export function getAllProjects(): Project[] {
  return projects;
}
