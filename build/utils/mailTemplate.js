"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/mailTemplate.ts
var mailTemplate_exports = {};
__export(mailTemplate_exports, {
  default: () => mailTemplate
});
module.exports = __toCommonJS(mailTemplate_exports);
function mailTemplate(name, token) {
  const html = `
  <div style="background-color: #f5f5f5; padding: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 16px;">
    <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
      <h1 style="text-align: center; color: #333;">Ol\xE1, ${name}!</h1>
      <p style="text-align: center; color: #333;">Para alterar sua senha, use o token abaixo, ele tem validade de uma hora.</p>
      <p style="text-align: center; color: #333;">Token: ${token}</p>
      <p style="text-align: center; color: #333;">Se voc\xEA n\xE3o solicitou uma altera\xE7\xE3o de senha, ignore este email.</p>
    </div>
  </div>
  `;
  return html;
}
