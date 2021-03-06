const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticatedVet,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticatedVet, (req, res) => {
  console.log("in /match GET route");
  console.log("Is User logged in?", req.isAuthenticated());
  console.log("req.user:", req.user);

  let queryText = `SELECT * FROM "categories"`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/complete/:id", rejectUnauthenticatedVet, (req, res) => {
  // GET route for complete matches
  console.log("in /match/complete GET route");
  console.log("match router get all matches req.user:", req.user);
  let vetId = req.params.id;
  let queryText = `SELECT match.*, veteran.first_name, organization.name, 
                  organization.number, organization.email, organization.website, 
                  organization.pictures, organization.description FROM match
                  INNER JOIN veteran ON veteran.id = match.vet_id
                  INNER JOIN organization ON organization.id = match.org_id
                  WHERE veteran.id = $1;`;
  pool
    .query(queryText, [vetId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get(`/newMatches/:id`, rejectUnauthenticatedVet, (req, res) => {
  const vetId = req.params.id;
  let queryText = `SELECT oc.org_id, o.name, o.email, o.website, o.pdf,  o.pictures,
                    count(oc.categories_id) AS org_needs, count(vc.categories_id) 
                    AS vet_has, (count(vc.categories_id) + 0.0) / 
                    (count(oc.categories_id) + 0.0) * 100 AS percent_match,
                    (SELECT EXISTS
                    (SELECT 1 FROM match WHERE match.vet_id = vc.vet_id AND match.org_id = oc.org_id)) AS exist
                    FROM organization_categories oc
                    JOIN veteran_categories vc ON vc.categories_id = oc.categories_id
                    JOIN organization o ON o.id = oc.org_id
                    WHERE vc.vet_id = $1
                    GROUP BY oc.org_id, o.name, vc.vet_id,  o.pictures, o.email, o.website, o.pdf       
                    ORDER BY percent_match DESC, vet_has DESC;`;

  pool
    .query(queryText, [vetId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// POST new match into match table
router.post('/postnew', rejectUnauthenticatedVet, (req, res) => {
  const vet_id = req.body.vet_id;
  console.log('match post vet_id', vet_id)
  const org_id = req.body.org_id;
  const time = req.body.time
  const queryText = `INSERT INTO "match" ("vet_id", "org_id", "received")
                      VALUES ($1, $2, $3);`;
  pool.query(queryText, [vet_id, org_id, time])
  .then((result) => {
    console.log('result.rows from match post router', result.rows)
    res.send(result.rows)
  })
  .catch((error) => {
    console.log(`Error from match post router ${error}`);
    res.sendStatus(500);
  });
});

module.exports = router;
