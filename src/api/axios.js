"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var api = axios_1.default.create({
    baseURL: 'https://lementor-b-trust-pme-2.onrender.com/api',
});
api.interceptors.request.use(function (config) {
    var token = localStorage.getItem('token');
    if (token)
        config.headers.Authorization = "Bearer ".concat(token);
    return config;
});
api.interceptors.response.use(function (res) { return res; }, function (err) {
    var _a;
    if (((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(err);
});
exports.default = api;
