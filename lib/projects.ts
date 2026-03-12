import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, ProjectSlug } from "@/types/project";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  const fileNames = fs.readdirSync(PROJECTS_DIRECTORY);
  const mdxFiles = fileNames.filter((name) => name.endsWith(".mdx"));

  const projects = mdxFiles.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "") as ProjectSlug;
    const fullPath = path.join(PROJECTS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);

    return {
      slug,
      content,
      ...frontmatter,
    } as Project;
  });

  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}
