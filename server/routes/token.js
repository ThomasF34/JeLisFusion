const jwt = require('jsonwebtoken');
// Modules
const express = require('express').Router();

module.exports = {
  verifyToken: function (req, res, next) {
    if (!req.headers.authorization) {
      //If the authorization is missing from header
      return res.status(401).send('Unauthorized request');
    }

    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
      return res.status(401).send('Unauthorized request');
    }

    let payload;
    try {
      payload = jwt.verify(token, 'MySuperSecretKey');
      if (!payload) {
        //if toekn is invalid, there's no payload generated, so we send 401 code
        return res.status(401).send('Unauthorized request');
      }

      req.userId = payload.subject;
      next();
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).send('Unauthorized request');
      }
    }
  }
};
