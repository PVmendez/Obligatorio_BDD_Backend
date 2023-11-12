"use strict";

const welcome = (req, res) => {
  res.status(200).json("hola");
};

export { welcome };