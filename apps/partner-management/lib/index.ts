export type Variant = 'pending' | 'confirmed' | 'declined';

export const colorMap: Record<Variant, string> = {
  pending: '#FFF3BF',
  confirmed: '#E9FAC8',
  declined: '#FFE3E3',
};
