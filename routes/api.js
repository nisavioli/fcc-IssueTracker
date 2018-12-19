/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const express = require("express");
const expect = require("chai").expect;
const controllers = require('../controllers')
// const mongoose  = require('mongoose');
// const Issue     = require('../model/issue');
// const Project   = require('../model/project');

const router = express.Router();
const {issue} = controllers;

const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result || { message: "OK" });
  } catch (error) {
    return res.status(500) && next(error);
  }
};
const c = controllerHandler;

router.get("/api/issues/:project/", c(issue.getIssues, (req, res, next) => [req, res, next]));
router.post("/api/issues/:project/", c(issue.createIssue, req => [req.params.project, req.body]));
router.put("/api/issues/:project/", c(issue.updateIssue, req => [req.params.project, req.body]));
router.delete("/api/issues/:project/", c(issue.deleteIssue, req => [req.params.project, req.body._id]));

module.exports = router;