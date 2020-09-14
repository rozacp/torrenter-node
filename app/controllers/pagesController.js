/**
 * Pages Controller
 */

// import { capitalize } from '../repositories/helpers';
import TorrentsRepository from '../repositories/TorrentsRepository';

const tdUser = '198412';
const tdToken = 'ba86e56103a9f54c17f744680d72b9c4';
const torrents = new TorrentsRepository(tdUser, tdToken);

export default {
  home: (req, res) => res.json({ page: 'home' }),
  dashboardShow: (req, res) => res.json({ page: 'dashboardShow' }),
  dashboardUpdate: (req, res) => res.json({ page: 'dashboardUpdate' }),
  test: (req, res, next) => {
    torrents.filter().then((json) => res.json(json)).catch(next);
  },
};
