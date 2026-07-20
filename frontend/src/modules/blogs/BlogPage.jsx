import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Eye, MessageSquare, Tag, ArrowRight, User, Send, CheckCircle2 } from 'lucide-react';
import { portfolioService } from '../../services/portfolioService';
import { SkeletonLoader } from '../../common/components/SkeletonLoader';

export function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlogModal, setActiveBlogModal] = useState(null);

  // Comment Form State
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSuccess, setCommentSuccess] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    portfolioService.getBlogs().then((res) => {
      setBlogs(res);
      setLoading(false);
    });
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentContent) return;
    setSubmittingComment(true);
    try {
      await portfolioService.addBlogComment(activeBlogModal.slug, {
        author_name: commentName,
        author_email: commentEmail,
        content: commentContent,
      });
      setCommentSuccess("Comment posted successfully!");
      setCommentName('');
      setCommentEmail('');
      setCommentContent('');
      // Refresh active blog details
      const updatedBlog = await portfolioService.getBlogBySlug(activeBlogModal.slug);
      setActiveBlogModal(updatedBlog);
    } catch {
      setCommentSuccess("Comment submitted!");
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Technical Writing & Insights</span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">Articles & Blog</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Insights on React 19 micro-folder architecture, Django REST Framework optimizations, PostgreSQL performance, and modern web development.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-600 dark:text-slate-400" />
        <input
          type="text"
          placeholder="Search articles by title, tag, or topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-300/60 dark:border-slate-700/60 text-slate-900 dark:text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Blogs Grid */}
      {loading ? (
        <SkeletonLoader type="card" count={3} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -4 }}
              className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between cursor-pointer group"
              onClick={() => {
                setActiveBlogModal(blog);
                setCommentSuccess('');
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 uppercase tracking-wider">
                    {blog.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{blog.published_at}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {blog.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags?.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-cyan-400" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 mt-6 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>{blog.views_count} views</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                    <span>{blog.comments_count || blog.comments?.length || 0} comments</span>
                  </span>
                </div>

                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeBlogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel w-full max-w-3xl p-8 rounded-3xl border border-cyan-500/30 space-y-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveBlogModal(null)}
                className="absolute top-6 right-6 px-3 py-1.5 rounded-xl glass-card text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100"
              >
                Close
              </button>

              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                  {activeBlogModal.category}
                </span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 leading-tight">{activeBlogModal.title}</h2>
                <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <span>Published: {activeBlogModal.published_at}</span>
                  <span>•</span>
                  <span>{activeBlogModal.views_count} views</span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="prose prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {activeBlogModal.content}
              </div>

              {/* Comments Section */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span>Comments ({activeBlogModal.comments?.length || 0})</span>
                </h3>

                {/* Comment List */}
                <div className="space-y-3">
                  {activeBlogModal.comments?.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl glass-card border border-slate-200/80 dark:border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          <span>{c.author_name}</span>
                        </span>
                        <span className="text-slate-500">{c.created_at}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">{c.content}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Leave a Comment</h4>
                  
                  {commentSuccess && (
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{commentSuccess}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      required
                      className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      required
                      className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Write your thoughts..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    disabled={submittingComment}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittingComment ? 'Posting...' : 'Post Comment'}</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
