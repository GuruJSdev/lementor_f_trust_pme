"use strict";
// src/utils/formatter.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.formatNumber = formatNumber;
exports.formatPhone = formatPhone;
exports.formatStatut = formatStatut;
function formatCurrency(value) {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XAF",
    }).format(Number(value));
}
function formatDate(date) {
    var d = new Date(date);
    return d.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
function formatNumber(value) {
    return new Intl.NumberFormat("fr-FR").format(Number(value));
}
function formatPhone(value) {
    return value.replace(/(\+242)(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
}
function formatStatut(statut) {
    var map = {
        SARL: "Société à Responsabilité Limitée",
        SA: "Société Anonyme",
        "Auto-entrepreneur": "Auto-entrepreneur",
    };
    return map[statut];
}
