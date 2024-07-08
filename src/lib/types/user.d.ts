interface User {
  id: string;
  name: string | null;
  lastname: string | null;
  phone_number: string | null;
  locationInfo: ApiLocationInfo;
  img: string | null;
  email: string;
  dob: string | null;
}
