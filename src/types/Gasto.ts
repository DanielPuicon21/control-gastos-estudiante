export interface Gasto {
  id: string;
  descripcion: string;
  cantidad: number;
  categoria: 'comida' | 'transporte' | 'salud' | 'entretenimiento' | 'estudios' | 'otros';
  fecha: string;
}