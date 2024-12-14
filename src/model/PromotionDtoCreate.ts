export interface PromotionDtoCreate{
    codigoPromocion: string;
    descripcion: string;
    descuento: number;
    fechaInicio: Date;
    fechaFin: Date;
    estado: boolean
}