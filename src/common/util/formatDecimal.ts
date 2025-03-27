export const numeroFormateado = (numero: number) => new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format(numero);
