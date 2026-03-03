import type { Route } from "./+types/home";
import Navbar from "../components/navbar";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your resume!" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>Upload your resume and get AI-powered feedback on your writing, formatting, and overall impact.</h2>
      </div>
    </section>

    {resumes.length > 0 && (
    <div className="resumes-section">
    {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
    ))}
    </div>
    )}
  </main>
}
