export interface Vehicle {
  id?: string;
  vehicleType: 'car' | 'motorcycle' | 'bicycle';
  brand?: string;
  model?: string;
  licensePlate?: string;
  color?: string;
  description?: string;
  registrationDate: string;
}
