/**
 * Filters Controller
 */

import Filter from '../models/Filter';
import { capitalize } from '../helpers';

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
  index: async (req, res, next) => {
    try {
      const filters = await Filter.find({});

      res.status(200).json(filters);
    } catch (err) {
      next(err);
    }
  },

  // store new filter
  store: async (req, res, next) => {
    const { name, type } = req.body;
    const properName = formatFilterName(name);
    const pattern = getPatternType(properName, type);

    try {
      const filter = await Filter.create({
        name: capitalize(properName),
        pattern,
        type,
      });

      res.status(201).json(filter);
    } catch (err) {
      next(err);
    }
  },

  // update existing filter
  update: async (req, res, next) => {
    const { id } = req.params;
    const { name, type } = req.body;
    const properName = name ? formatFilterName(name) : undefined;
    const pattern = properName ? getPatternType(properName, type) : undefined;

    try {
      const filter = await Filter.findById(id);

      if (!filter) {
        res.status(404);
        throw new Error(`Not Found - ${req.originalUrl}`);
      }

      filter.name = capitalize(properName);
      filter.pattern = pattern;
      filter.type = type;

      await filter.save();
      await res.status(200).json(filter);
    } catch (err) {
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

      const deleted = await filter.remove();
      res.status(204).json(deleted);
    } catch (err) {
      next(err);
    }
  },
};
