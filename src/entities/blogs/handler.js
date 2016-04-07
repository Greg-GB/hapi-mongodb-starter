module.exports = (server, blogs) => {
  return {
    getBlogs: (request, reply) => {
      return blogs.find({})
        .then(reply, (err) => reply.handleError(err));
    },
    getBlogById(request, reply) {
      return blogs.findById(request.params.blog)
        .then(reply, (err) => reply.handleError(err));
    },
    createBlog: (request, reply) => {
      return blogs.create(request.payload)
        .then(reply, (err) => reply.handleError(err));
    },
    updateBlogById: (request, reply) => {
      return blogs.updateById(request.params.blog, request.payload)
        .then(() => blogs.findById(request.params.blog))
        .then(reply, (err) => reply.handleError(err));
    },
    deleteBlogById: (request, reply) => {
      return blogs.deleteById(request.params.blog)
        .then(reply, (err) => reply.handleError(err));
    }
  };
};
