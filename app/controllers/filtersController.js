/**
 * Filters Controller
 */

import Filter from '../models/Filter';
import { capitalize } from '../helpers';

const formatFilterName = name => name
  .trim()
  .replace(/\s\s+/g, ' ')
  .toLowerCase();

const getPattern = (name, type) => {
  const dottedName = name.replace(/\s/g, '.');

  if (type === 'series') {
    return `^${dottedName}.s(\\d{2})e(\\d{2}).*`;
  }

  if (type === 'movies') {
    return `^${dottedName}.*`;
  }

  return undefined;
};

export default {
  // list all filters
  index: async (req, res, next) => {
    try {
      const filters = await Filter.find();

      res.json(filters);
    } catch (err) {
      next(err);
    }
  },

  // store new filter
  store: async (req, res, next) => {
    const { name, type } = req.body;
    const properName = name ? formatFilterName(name) : undefined;
    const pattern = properName ? getPattern(properName, type) : undefined;

    try {
      const filter = await Filter.create({ // if does not exist?
        name: capitalize(properName),
        pattern,
        type,
      });

      res.status(201).json(filter);
    } catch (err) {
      res.status(400);
      next(err);
    }
  },

  // update existing filter
  update: async (req, res, next) => {
    const { id } = req.params;
    const { name, type } = req.body;
    const properName = name ? capitalize(formatFilterName(name)) : undefined;
    const pattern = properName ? getPattern(properName, type) : undefined;

    try {
      const filter = await Filter.findById(id);

      if (!filter) {
        res.status(404);
        throw new Error(`Not Found - ${req.originalUrl}`);
      }

      const updated = {
        name: properName || filter.name,
        pattern: pattern || filter.pattern,
        type: type || filter.type,
      };

      await filter.update(updated, {
        runValidators: true,
      });

      res.json(updated);
      // res.json({ message: 'Filter updated' });
    } catch (err) {
      res.status(400);
      next(err);
    }
  },

  // delete existing filter
  destroy: async (req, res, next) => {
    const { id } = req.params;

    try {
      const filter = await Filter.findById(id);

      if (!filter) {
        res.status(404);
        throw new Error(`Not Found - ${req.originalUrl}`);
      }

      await filter.remove();
      res.json({ message: 'Filter deleted' });
    } catch (err) {
      next(err);
    }
  },
};
