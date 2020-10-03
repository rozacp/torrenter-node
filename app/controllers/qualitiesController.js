/**
 * Qualities Controller
 */

import Quality from '../models/Quality';
import { capitalize } from '../helpers';

const formatQualityName = name => capitalize(name.replace(/\s/g, ''));

export default {
  // list all qualities
  index: async (req, res, next) => {
    try {
      const qualities = await Quality.find();

      res.json(qualities);
    } catch (err) {
      next(err);
    }
  },

  // store new quality
  store: async (req, res, next) => {
    const { name, code, active } = req.body;
    const properName = formatQualityName(name);

    try {
      const quality = await Quality.create({
        name: properName,
        code,
        active,
      });

      return res.status(201).json(quality);
    } catch (err) {
      res.status(400);
      return next(err);
    }
  },

  // update existing quality
  update: (req, res) => {
    const { id } = req.params;
    const { name, code, active } = req.body;
    const properName = name ? formatQualityName(name) : undefined;

    res.json({
      page: 'put/patch /qualities/id',
      params: req.params,
      body: req.body,
      properName,
      code,
      active,
      payload: {
        id: Number(id),
        name: properName,
        code,
        active,
      },
    });
  },

  // delete existing quality
  destroy: (req, res) => {
    const { id } = req.params;

    res.json({
      page: 'delete /qualities/id',
      params: req.params,
      body: req.body,
      payload: {
        id: Number(id),
      },
    });
  },
};
