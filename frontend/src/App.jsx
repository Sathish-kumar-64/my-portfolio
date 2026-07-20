import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './common/context/ThemeContext';
import { AuthProvider } from './common/context/AuthContext';
import { ScrollProgressBar } from './common/components/ScrollProgressBar';
import { CanvasBackground } from './common/components/CanvasBackground';
import { Navbar } from './common/components/Navbar';
import { Footer } from './common/components/Footer';
import { ProtectedRoute } from './common/components/ProtectedRoute';

// Pages
import { HomePage } from './modules/home/HomePage';
import { AboutPage } from './modules/about/AboutPage';
import { SkillsPage } from './modules/skills/SkillsPage';
import { ProjectsPage } from './modules/projects/ProjectsPage';
import { ExperiencePage } from './modules/experience/ExperiencePage';
import { CertificatesPage } from './modules/certificates/CertificatesPage';
import { BlogPage } from './modules/blogs/BlogPage';
import { ContactPage } from './modules/contact/ContactPage';
import { AdminLoginPage } from './modules/admin/AdminLoginPage';
import { AdminDashboardPage } from './modules/admin/AdminDashboardPage';
import { NotFoundPage } from './common/components/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col relative text-slate-900 bg-slate-50 dark:text-slate-100 dark:bg-[#0a0d14] selection:bg-cyan-500 selection:text-black transition-colors duration-300">
            {/* Top Progress Bar & Background Canvas */}
            <ScrollProgressBar />
            <CanvasBackground />

            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1 pt-24 pb-16 relative z-10">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/certificates" element={<CertificatesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Admin Auth Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
