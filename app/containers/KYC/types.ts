export type PersonalInfo = {
  national_id: string;
  booklet_id: string;
  birthday_date: string;
  birthday_month: string;
  birthday_year: string;
  email: string;
  postal_code: string;
  address: string;
}

export type BankCard = {
  id: number,
  card_number:string,
  verification_status: number,
  bank_name:string,
  logo:string,
}
