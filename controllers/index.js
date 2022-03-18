const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

//if we make an endpoitn request that doesnt exist, 404 err
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;