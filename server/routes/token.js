const jwt = require('jsonwebtoken');
const userController = require('../controllers/user');
// Modules
const express = require('express').Router();

module.exports = {
  verifyToken: function (req, res, next) {
    console.log("Verifying token");
    if (!req.headers.authorization) {
      //If the authorization is missing from header
      return res.status(401).send({message : 'Unauthorized request'});
    }

    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
      return res.status(401).send({message : 'Unauthorized request'});
    }

    let payload;
    try {
      payload = jwt.verify(token, 'ItsASecretKey');
      if (!payload) {
        //if toekn is invalid, there's no payload generated, so we send 401 code
        return res.status(401).send({message : 'Unauthorized request'});
      }

      req.idUser = payload.subject;
      console.log("Token for user " + req.idUser);
      next();
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        console.log('Expired token');
        return res.status(401).send({message :"Token expired"});
      } else if (e instanceof jwt.JsonWebTokenError) {
        console.log("JWT ERROR Token for user " + req.idUser);
        return res.status(401).send({message : 'Unauthorized request'});
      }
    }
  },

  verifyAdmin: function (req, res, next) {
    console.log("Verifying token");
    if (!req.headers.authorization) {
      //If the authorization is missing from header
      return res.status(401).send({message : 'Unauthorized request'});
    }

    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
      return res.status(401).send({message : 'Unauthorized request'});
    }

    let payload;
    try {
      payload = jwt.verify(token, 'ItsASecretKey');
      if (!payload) {
        //if token is invalid, there's no payload generated, so we send 401 code
        return res.status(401).send({message : 'Unauthorized request'});
      }

      req.idUser = payload.subject;
      console.log("Token for user " + req.idUser);
      userController.isAdmin(req, req.idUser, bool => {
        if(bool){
          console.log("Access granted");
          next();
        } else {
        return res.status(403).send({message : "Forbidden access"});
        }
      });
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        console.log('Expired token');
        return res.status(401).send({message :"Token expired"});
      } else if (e instanceof jwt.JsonWebTokenError) {
        console.log("JWT ERROR Token for user " + req.idUser);
        return res.status(401).send({message : 'Unauthorized request'});
      }
    }
  },

  getUserIdFromToken: function (req, res, next){
    console.log("Verifying token");
    if (!req.headers.authorization) {
      //If the authorization is missing from header
      return res.status(200).json(false);
    }

    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
      return res.status(200).json(false);
    }

    let payload;
    try {
      payload = jwt.verify(token, 'ItsASecretKey');
      if (!payload) {
        //if token is invalid, there's no payload generated, so we send 401 code
        return res.status(200).json(false);
      } else {
        req.idUser = payload.subject;
        console.log("Token for user " + req.idUser);
      }
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        console.log('Expired token');
        return res.status(200).json(false);
      } else if (e instanceof jwt.JsonWebTokenError) {
        return res.status(200).json(false);
      }
    }
    next();
  }
}
