/**
 * Filters Controller
 */

import { capitalize } from '../repositories/helpers';

const formatFilterName = name => name
  .trim()
  .replace(/\s\s+/g, ' ')
  .toLowerCase();

const getPatternType = (name, type) => {
  const dottedName = name.replace(/\s/g, '.');

  if (type === 'series') {
    return `^${dottedName}.s(\\d{2})e(\\d{2}).*`;
  }
  return `^${dottedName}.*`;
};

export default {
  // list all filters
  index: (req, res) => res.json({ page: 'get /filters' }),

  // store new filter
  store: (req, res) => {
    const { name, type } = req.body;
    const properName = formatFilterName(name);
    const pattern = getPatternType(properName, type);

    res.json({
      page: 'post /filters',
      params: req.params,
      body: req.body,
      properName,
      pattern,
      payload: {
        name: capitalize(properName),
        pattern,
        type,
      },
    });
  },

  // update existing filter
  update: (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;
    const properName = name ? formatFilterName(name) : undefined;
    const pattern = properName ? getPatternType(properName, type) : undefined;

    res.json({
      page: 'put/patch /filters/id',
      params: req.params,
      body: req.body,
      properName,
      pattern,
      payload: {
        id: Number(id),
        name: capitalize(properName),
        pattern,
        type,
      },
    });
  },

  // delete existing filter
  destroy: (req, res) => {
    const { id } = req.params;

    res.json({
      page: 'delete /filters/id',
      params: req.params,
      body: req.body,
      payload: {
        id: Number(id),
      },
    });
  },
};
