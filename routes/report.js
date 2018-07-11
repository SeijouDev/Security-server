var express = require('express');
var Report = require('../models/reportEntity');
var router = express.Router();
var User = require('../models/userEntity');

router.get('/', (req, res) => {
    Report.findAll((err, data) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(data);
    });
});

router.get('/user/:id', (req, res) => {
    Report.findOne(req.params.id, (err, data) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(data);
    });
});

router.get('/type/:id', (req, res) => {
    Report.findOne(req.params.id, (err, data) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(data);
    });
});

router.post('/create', (req, res) => {
    let report = {
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        dates: req.body.dates,
        hours: req.body.hours,
        id_user: req.body.id_user,
        states: req.body.states,
        type: req.body.type
    }

    Report.insert(report, (err, data) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            if (data && data.result) {
                res.status(200).json({
                    msg: 'Report inserted!',
                    data: data
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    msg: 'Error creating report :(',
                    err: err
                });
            }
        }
    });
});

module.exports = router;
