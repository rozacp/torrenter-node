/**
 * Pages Controller
 */

import TorrentsRepository from '../repositories/TorrentsRepository';

const tdUser = '198412';
const tdToken = 'ba86e56103a9f54c17f744680d72b9c4';
const torrents = new TorrentsRepository(tdUser, tdToken);

export default {
  test: async (req, res, next) => {
    try {
      const data = await torrents.filter();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
};
