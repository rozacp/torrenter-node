export default {
  home: (req, res) => res.send({ page: 'home' }),
  dashboard: (req, res) => res.send({ page: 'dashboard' }),
  // saveDashboard: (req, res) => res.send({ page: 'saveDashboard' }),
  test: (req, res) => res.send({ page: 'test' }),
};
