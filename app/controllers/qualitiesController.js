/**
 * Qualities Controller
 */

const formatQualityName = name => name
  .replace(/\s/g, '')
  .toLowerCase();

export default {
  // list all qualities
  index: (req, res) => res.send({ page: 'get /qualities' }),

  // store new quality
  store: (req, res) => {
    const { name, code, active } = req.body;
    const properName = formatQualityName(name);

    res.send({
      page: 'post /qualities',
      params: req.params,
      body: req.body,
      properName,
      code,
      active,
      payload: {
        name: properName,
        code,
        active,
      },
    });
  },

  // update existing quality
  update: (req, res) => {
    const { id } = req.params;
    const { name, code, active } = req.body;
    const properName = name ? formatQualityName(name) : undefined;

    res.send({
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

    res.send({
      page: 'delete /qualities/id',
      params: req.params,
      body: req.body,
      payload: {
        id: Number(id),
      },
    });
  },
};
